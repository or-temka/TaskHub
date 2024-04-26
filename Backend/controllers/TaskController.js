import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import TaskModel from '../models/Task.js'

export const getTask = async (req, res) => {
  try {
    const taskId = req.params.id

    const task = await TaskModel.findById(taskId)
    if (!task) {
      serverMsg(
        `Попытка получения данных о задании: не найдено задание с id ${taskId}`
      )
      return res.status(404).json({
        errorMsg: 'Не определено задание',
      })
    }

    const { ...taskData } = task._doc

    serverMsg(`Получены данные о задании: ${taskData.name}`)
    res.json(taskData)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка получения данных о задании',
    })
  }
}

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find()

    serverMsg(`Получены данные о всех заданиях`)
    res.json(tasks)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка получения данных о заданиях',
    })
  }
}
