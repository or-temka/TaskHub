import { serverError, serverMsg } from '../serverLog.js'

import UserModel from '../../models/User.js'

// Проверяет, запущено ли задание (решается - проверку проходит)
export default async (req, res, next) => {
  try {
    const userId = req.userId
    const userTaskId = req.params.taskId

    const user = await UserModel.findById(userId)
    if (!user) {
      serverMsg(
        `Проверка выполнения задания: не найден пользователь с id ${userId}`
      )
      return res.status(404).json({
        errorMsg: 'Не найден пользователь',
      })
    }

    const currentTask = user.tasks.find((task) => task.id === userTaskId)

    if (currentTask.status === 'started') {
      req.user = user
      req.currentTask = currentTask
      next()
    } else {
      serverMsg(
        `Проверка выполнения задания: задание с id ${currentTask.id} у пользователя ${user.name} не начато`
      )
      return res.status(403).json({
        errorMsg: 'Задание не начато',
      })
    }
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка проверки статуса задания на "в процессе выполнения"',
    })
  }
}
