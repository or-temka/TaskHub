import { validationResult } from 'express-validator'
import { v4 as uuidv4 } from 'uuid'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import UserModel from '../models/User.js'
import TaskModel from '../models/Task.js'
import GroupModel from '../models/Group.js'

export const add = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const userId = req.params.userId
    const taskId = req.body.originalTaskId

    const existingUser = await UserModel.findById(userId)
    const task = await TaskModel.findById(taskId)

    // Если пользовательское задание с оригинальным id задания уже есть
    const userTasksIds = existingUser.tasks.map((task) => task.originalTaskId)
    if (userTasksIds.includes(taskId)) {
      serverMsg(
        `Попытка добавление пользователю "${existingUser.name}" уже выданного задания "${task.name}"`
      )
      return res
        .status(409)
        .json({ errorMsg: 'У данного пользователя уже есть такое задание' })
    }

    const userTask = {
      id: uuidv4(),
      originalTaskId: taskId,
      newTask: true,
      attemptsCount: task.attempts,
    }

    await UserModel.updateOne(
      { _id: userId },
      {
        tasks: [...existingUser.tasks, userTask],
      }
    )

    serverLog(
      `Пользователю ${existingUser.name} было добавлено задание с id ${taskId}`
    )
    res.json({ added: true })
  } catch (error) {
    serverError(error)
    res
      .status(500)
      .json({ errorMsg: 'Произошла ошибка добавления задания пользователю' })
  }
}

export const addForGroup = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const groupId = req.params.groupId
    const taskId = req.body.originalTaskId

    const group = await GroupModel.findById(groupId)
    const task = await TaskModel.findById(taskId)

    if (!group) {
      serverMsg(
        `Попытка добавления задания группе: не найдена группа с id ${groupId}`
      )
      return res.status(404).json({ errorMsg: 'Не найдена группа' })
    }

    // Прохождение по всем пользователям группы
    group.studentsId.map(async (userId) => {
      const existingUser = await UserModel.findById(userId)
      // Если пользовательское задание с оригинальным id задания уже есть
      const userTasksIds = existingUser.tasks.map((task) => task.originalTaskId)
      if (userTasksIds.includes(taskId)) return

      const userTask = {
        id: uuidv4(),
        originalTaskId: taskId,
        newTask: true,
        attemptsCount: task.attempts,
      }

      await UserModel.updateOne(
        { _id: userId },
        {
          tasks: [...existingUser.tasks, userTask],
        }
      )
    })

    serverLog(`Пользователям группы ${group.name} было выдано задание`)
    res.json({ added: true })
  } catch (error) {
    serverError(error)
    res
      .status(500)
      .json({ errorMsg: 'Произошла ошибка добавления задания пользователю' })
  }
}

export const getUserTask = async (req, res) => {
  try {
    const userId = req.params.userId
    const taskId = req.body.taskId

    const user = await UserModel.findById(userId)

    if (!user) {
      serverMsg(
        `Попытка получения данных о задании пользователя: не найден пользователь с id ${userId}`
      )
      return res.status(404).json({
        errorMsg: 'Пользователь не найден',
      })
    }

    const { tasks } = user._doc
    const task = tasks.find((task) => task.id === taskId)

    if (!task) {
      serverMsg(
        `Попытка получения данных о задании пользователя: указан неверный id задания ${taskId}`
      )
      return res.status(404).json({
        errorMsg: 'Задание не найдено',
      })
    }

    serverMsg(`Получены данные о задании пользователя "${user.name}"`)
    res.json(task)
  } catch (error) {
    serverError(error)
    res.status(500).json({ errorMsg: 'Произошла ошибка создания группы' })
  }
}

export const getAllUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await UserModel.findById(userId)
    if (!user) {
      serverMsg(
        `Попытка получения данных о задании пользователя: не найден пользователь с id ${userId}`
      )
      return res.status(404).json({
        errorMsg: 'Пользователь не найден',
      })
    }

    const { tasks } = user._doc

    serverMsg(`Получены данные о заданиях пользователя "${user.name}"`)
    res.json(tasks)
  } catch (error) {
    serverError(error)
    res
      .status(500)
      .json({ errorMsg: 'Произошла ошибка получения заданий пользователя' })
  }
}

export const getMyUserTasks = async (req, res) => {
  try {
    const userId = req.userId

    const user = await UserModel.findById(userId)
    if (!user) {
      serverMsg(
        `Попытка получения данных о задании пользователя: не найден пользователь с id ${userId}`
      )
      return res.status(404).json({
        errorMsg: 'Пользователь не найден',
      })
    }

    const { tasks } = user._doc

    // Получаем оригинальное задание и соединяем их
    const newTasksPromises = tasks.map(async (userTask) => {
      const originalTask = await TaskModel.findById(userTask.originalTaskId)
      const newTask = {
        ...userTask,
        name: originalTask.name,
        instruction: originalTask.instruction,
        filesId: originalTask.filesId,
        statistic: originalTask.statistic,
        timeForExecute: originalTask.timeForExecute,
        questionsCount: originalTask.questions.length,
        practiceQuestionsCount: originalTask.practiceQuestions.length,
      }
      return newTask
    })
    const newTasks = await Promise.all(newTasksPromises)

    serverMsg(`Получены данные о заданиях пользователя (о себе) "${user.name}"`)
    res.json(newTasks)
  } catch (error) {
    serverError(error)
    res.status(500).json({ errorMsg: 'Произошла ошибка получения заданий' })
  }
}

export const getMyUserTask = async (req, res) => {
  try {
    const userId = req.userId
    const userTaskId = req.params.taskId

    const user = await UserModel.findById(userId)
    if (!user) {
      serverMsg(
        `Попытка получения данных о задании пользователя: не найден пользователь с id ${userId}`
      )
      return res.status(404).json({
        errorMsg: 'Пользователь не найден',
      })
    }

    const userTask = user._doc.tasks.find(
      (userTask) => userTask.id === userTaskId
    )
    if (!userTask) {
      serverMsg(
        `Попытка получения данных о задании пользователя: не найдено задание с id ${userTaskId}`
      )
      return res.status(404).json({
        errorMsg: 'Задание не найдено у пользователя',
      })
    }

    const originalTask = await TaskModel.findById(userTask.originalTaskId)
    if (!originalTask) {
      serverMsg(
        `Попытка получения данных о задании пользователя: не найдено оригинальное задание с id ${userTask.originalTaskId}`
      )
      return res.status(404).json({
        errorMsg: 'Оригинальное задание не найдено',
      })
    }

    const newTask = {
      ...userTask,
      name: originalTask.name,
      instruction: originalTask.instruction,
      filesId: originalTask.filesId,
      statistic: originalTask.statistic,
      timeForExecute: originalTask.timeForExecute,
      questionsCount: originalTask.questions.length,
      practiceQuestionsCount: originalTask.practiceQuestions.length,
    }

    serverMsg(
      `Получены данные о задании "${newTask.name}" пользователя (о себе) "${user.name}"`
    )
    res.json(newTask)
  } catch (error) {
    serverError(error)
    res.status(500).json({ errorMsg: 'Произошла ошибка получения заданий' })
  }
}

export const updateUserTask = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const userId = req.params.userId
    const taskId = req.body.taskId

    const existingUser = await UserModel.findById(userId)
    let userTaskIndex
    const existingUserTask = existingUser.tasks.find((task, index) => {
      if (task.id === taskId) {
        userTaskIndex = index
        return true
      }
    })

    if (!existingUserTask) {
      serverMsg(
        `Попытка изменения задания пользователя: указано несуществующее задание с id ${taskId}`
      )
      return res.status(404).json({
        errorMsg: 'Задание пользователя не найдено',
      })
    }

    await UserModel.findOneAndUpdate(
      { _id: userId, 'tasks.id': taskId },
      {
        $set: {
          'tasks.$.mark': req.body.mark || existingUserTask.mark,
          'tasks.$.notRoundMark':
            req.body.notRoundMark || existingUserTask.notRoundMark,
          'tasks.$.newTask':
            req.body.newTask === true || req.body.newTask === false
              ? req.body.newTask
              : existingUserTask.newTask, // Чтобы записать булевое значение
          'tasks.$.attemptsCount':
            req.body.attemptsCount || existingUserTask.attemptsCount,
        },
      }
    )

    serverMsg(`Было обновлено задание пользователя ${existingUser.name}`)
    res.json({ updated: true })
  } catch (error) {
    serverError(error)
    res
      .status(500)
      .json({ errorMsg: 'Произошла ошибка обновления задания пользователя' })
  }
}
