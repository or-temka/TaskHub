import { validationResult } from 'express-validator'
import { v4 as uuidv4 } from 'uuid'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import UserModel from '../models/User.js'
import TaskModel from '../models/Task.js'

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
    res.status(500).json({ errorMsg: 'Произошла ошибка создания группы' })
  }
}
