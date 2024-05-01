import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import GroupModel from '../models/Group.js'
import UserModel from '../models/User.js'

export const addStudentInGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId
    const userId = req.body.userId

    const existingGroup = await GroupModel.findById(groupId)
    const existingUser = await UserModel.findById(userId)

    if (existingGroup.studentsId.includes(userId)) {
      serverMsg(
        `Попытка добавления пользователя в группу: пользователь с id ${userId} уже находится в группе ${existingGroup.name}`
      )
      return res.status(409).json({
        errorMsg: 'Пользователь уже добавлен в группу',
      })
    }

    // Добавление в группу id пользователя
    const updatedGroup = await GroupModel.findOneAndUpdate(
      { _id: groupId },
      {
        $set: {
          studentsId: [...existingGroup.studentsId, userId],
        },
      },
      { new: true }
    )

    // Добавление пользователю id группы
    if (existingUser.groupId) {
      // Если пользователь уже есть в группе
      const oldGroupId = existingUser.groupId
      const oldUserGroup = await GroupModel.findById(oldGroupId)
      await GroupModel.updateOne(
        { _id: oldGroupId },
        {
          studentsId: [...oldUserGroup.studentsId].filter(
            (uId) => uId !== userId
          ),
        }
      )
    }
    await UserModel.updateOne(
      { _id: userId },
      {
        groupId: groupId,
      }
    )

    serverLog(
      `В группу ${existingGroup.name} был добавлен пользователь с id ${userId}`
    )
    res.json(updatedGroup)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка добавление пользователя в группу',
    })
  }
}

export const delStudentFromGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId
    const userId = req.body.userId

    const existingGroup = await GroupModel.findById(groupId)

    if (!existingGroup.studentsId.includes(userId)) {
      serverMsg(
        `Попытка удаления пользователя из группы: пользователя с id ${userId} нет в группе ${existingGroup.name}`
      )
      return res.status(409).json({
        errorMsg: 'Пользователь не найден в группе',
      })
    }

    // Удаление из group id пользователя
    const updatedGroup = await GroupModel.findOneAndUpdate(
      { _id: groupId },
      {
        $set: {
          studentsId: [...existingGroup.studentsId].filter(
            (uId) => uId !== userId
          ),
        },
      },
      { new: true }
    )

    // Удаление у user id группы
    await UserModel.updateOne({ _id: userId }, { $unset: { groupId: '' } })

    serverMsg(
      `Из группы ${existingGroup.name} был удален пользователь с id ${userId}`
    )
    res.json(updatedGroup)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка удаления пользователя из группы',
    })
  }
}
