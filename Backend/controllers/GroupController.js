import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import GroupModel from '../models/Group.js'

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
