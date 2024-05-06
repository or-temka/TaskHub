import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import TaskModel from '../models/Task.js'
import GroupModel from '../models/Group.js'
import UserModel from '../models/User.js'

export const markUserTaskNotNew = async (req, res) => {
  try {
    const userId = req.userId
    const userTaskId = req.params.taskId

    const user = await UserModel.findById(userId)
    if (!user) {
      serverMsg(
        `Попытка изменения задания в статус "не новое": не найден пользователь с id ${userId}`
      )
      return res.status(404).json({
        errorMsg: 'Не найден пользователь',
      })
    }

    const newUser = await UserModel.findOneAndUpdate(
      {
        _id: userId,
        'tasks.id': userTaskId,
      },
      { $set: { 'tasks.$.newTask': false } },
      { new: true }
    )

    res.json(newUser)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка отметки нового задания как просмотренного',
    })
  }
}
