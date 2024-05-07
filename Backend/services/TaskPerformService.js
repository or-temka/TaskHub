import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import TaskModel from '../models/Task.js'
import GroupModel from '../models/Group.js'
import UserModel from '../models/User.js'

// Начинает выполнение задания (отсчёт таймера) и завершение по истечению времени
export const startTask = async (req, res) => {
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

    // Работа с попытками
    const currentTask = user.tasks.find((task) => task.id === userTaskId)
    const currentAttemptsTaskCount = currentTask.attemptsCount
    // Если попыток больше не осталось
    if (currentAttemptsTaskCount <= 0) {
      serverMsg(
        `Попытка решить задание: не осталось попыток у пользователя ${user.name} для задания с id ${currentTask.id}`
      )
      return res.status(403).json({
        errorMsg: 'Не осталось попыток для решения задания.',
      })
    }
    // Если попытки остались (идем дальше)
    await UserModel.findOneAndUpdate(
      {
        _id: userId,
        'tasks.id': userTaskId,
      },
      { $set: { 'tasks.$.attemptsCount': currentAttemptsTaskCount - 1 } }
    )

    // Запуск таймера задания
    const timerTime = 30 // в секундах
    const requestRateTime = 1000 // как часто будут отправляться и изменяться запросы (в мс)
    const timerTimeMsc = timerTime * 1000
    let nowTime = 0
    await UserModel.findOneAndUpdate(
      {
        _id: userId,
        'tasks.id': userTaskId,
      },
      { $set: { 'tasks.$.nowTime': 0, 'tasks.$.status': 'started' } }
    )
    const taskTimeInterval = setInterval(async () => {
      // Проверка не завершено ли задание уже (пользователь решил его раньше времени) (каждые 10 секунд проверка)
      if (nowTime % 10000 === 0) {
        const user = await UserModel.findById(userId)
        const currentTask = user.tasks.find((task) => task.id === userTaskId)
        if (currentTask.status === 'user_complete') {
          clearInterval(taskTimeInterval)
          await UserModel.findOneAndUpdate(
            {
              _id: userId,
              'tasks.id': userTaskId,
            },
            {
              $unset: { 'tasks.$.nowTime': 0 },
            }
          )
          return
        }
      }

      // Проверка не вышло ли время
      if (nowTime > timerTimeMsc) {
        // Завершение, если время вышло
        clearInterval(taskTimeInterval)
        await UserModel.findOneAndUpdate(
          {
            _id: userId,
            'tasks.id': userTaskId,
          },
          {
            $set: { 'tasks.$.status': 'complete' },
            $unset: { 'tasks.$.nowTime': 0 },
          }
        )
        return
      }

      // Если прошло все проверки:
      await UserModel.findOneAndUpdate(
        {
          _id: userId,
          'tasks.id': userTaskId,
        },
        { $set: { 'tasks.$.nowTime': nowTime } }
      )
      nowTime += requestRateTime
    }, requestRateTime)

    res.json({ started: true })
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка отметки нового задания как просмотренного',
    })
  }
}
