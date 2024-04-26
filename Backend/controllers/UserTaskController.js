import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import UserModel from '../models/User.js'
import TaskModel from '../models/Task.js'

export const add = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const userId = req.params.id
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
    res.status(500).json({ errorMsg: 'Произошла ошибка создания группы' })
  }
}
