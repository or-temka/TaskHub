import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import GroupModel from '../models/Group.js'
import UserModel from '../models/User.js'

export const create = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const doc = new GroupModel({
      name: req.body.name,
      cource: req.body.cource,
    })

    let group
    try {
      group = await doc.save()
    } catch (error) {
      serverMsg(`Попытка создать группу: название ${req.body.name} уже занято`)
      res
        .status(409)
        .json({ errorMsg: 'Группа с таким названием уже существует' })
      return
    }

    serverLog(`Новая группа: ${group.name}`)
    res.json({ added: true })
  } catch (error) {
    serverError(error)
    res.status(500).json({ errorMsg: 'Произошла ошибка создания группы' })
  }
}

export const getMyGroupInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
    if (!user) {
      serverMsg(
        `Попытка получения данных о группе (о своей): не найден пользователь с id ${req.userId}`
      )
      return res.status(404).json({
        errorMsg: 'Пользователь не найден',
      })
    }

    const group = await GroupModel.findById(user.groupId)
    if (!group) {
      serverMsg(
        `Попытка получения данных о группе (о своей): не найдена группа с id ${user.groupId}`
      )
      return res.status(404).json({
        errorMsg: 'Не определена группа пользователя',
      })
    }

    const { ...groupData } = group._doc

    serverMsg(
      `Получены данные о группе (о своей): пользователь ${user.name} получил данные о своей группе ${groupData.name}`
    )
    res.json(groupData)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка получения данных о группе',
    })
  }
}

export const getGroupInfo = async (req, res) => {
  try {
    const groupId = req.params.id

    const group = await GroupModel.findById(groupId)
    if (!group) {
      serverMsg(
        `Попытка получения данных о группе: не найдена группа с id ${groupId}`
      )
      return res.status(404).json({
        errorMsg: 'Не определена группа',
      })
    }

    const { ...groupData } = group._doc

    serverMsg(`Получены данные о группе: ${groupData.name}`)
    res.json(groupData)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка получения данных о группе',
    })
  }
}

export const getAllGroupsInfo = async (req, res) => {
  try {
    const groups = await GroupModel.find()

    serverMsg(`Получены данные о всех группах`)
    res.json(groups)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка получения данных о группах',
    })
  }
}

export const update = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const groupId = req.params.id

    const existingGroup = await GroupModel.findById(groupId)
    const updatedGroup = await GroupModel.findOneAndUpdate(
      { _id: groupId },
      {
        $set: {
          name: req.body.name || existingGroup.name,
          cource: req.body.cource || existingGroup.cource,
        },
      },
      { new: true }
    )

    serverLog(`Была обновлена группа ${existingGroup.name}`)
    res.json(updatedGroup)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка редактирования группы',
    })
  }
}
