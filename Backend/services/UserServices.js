import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import GroupModel from '../models/Group.js'
import UserModel from '../models/User.js'

export const delGroupFromStudent = async (req, res) => {
  try {
    const userId = req.params.userId

    const existingUser = await UserModel.findById(userId)
    const groupId = existingUser.groupId

    if (!groupId) {
      serverMsg(
        `Попытка удаления пользователя из группы: у пользователя с id ${userId} нет группы`
      )
      return res.status(404).json({
        errorMsg: 'Пользователь не найден в группе',
      })
    }

    const existingGroup = await GroupModel.findById(groupId)

    // Удаление из group id пользователя
    await GroupModel.findOneAndUpdate(
      { _id: groupId },
      {
        $set: {
          studentsId: [...existingGroup.studentsId].filter(
            (uId) => uId !== userId
          ),
        },
      }
    )

    // Удаление у user id группы
    await UserModel.updateOne({ _id: userId }, { $unset: { groupId: '' } })

    serverMsg(
      `Из группы ${existingGroup.name} был удален пользователь с id ${userId}`
    )
    res.json()
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка удаления пользователя из группы',
    })
  }
}

export const getUsersWithoutTask = async (req, res) => {
  try {
    const taskId = req.params.taskId

    if (!taskId) {
      serverMsg(
        `Попытка получить пользователей без определенного задания: не указан id задания`
      )
      return res.status(400).json({
        errorMsg: 'Не был получен id задания',
      })
    }

    const users = await UserModel.find({
      role: 'student',
      tasks: {
        $not: {
          $elemMatch: {
            originalTaskId: taskId,
          },
        },
      },
    })

    res.json(users)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка получения пользователей',
    })
  }
}
