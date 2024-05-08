import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import TaskModel from '../models/Task.js'
import GroupModel from '../models/Group.js'
import UserModel from '../models/User.js'

// Подсчёт результатов выполненного задания
const calculationResults = async (
  user,
  userTaskId,
  originalTask,
  taskRuntime
) => {
  try {
    const userTask = user.tasks.find((task) => task.id === userTaskId)
    const questions = userTask.questions
    const practiceQuestions = userTask.practiceQuestions
    const originalQuestions = originalTask.questions
    const originalPracticeQuestions = originalTask.practiceQuestions
    const userPracticeData = userTask.forPracticeData

    let trueQuestionsAnswersCount = 0
    let questionsAnswersCount = 0

    // Подсчёт результатов за тест
    questions.map((userQuestion) => {
      const originalQuestion = originalQuestions.find(
        (originalQuestion) => originalQuestion.id === userQuestion.questionId
      )
      if (!originalQuestion) return

      const originalAnswer = originalQuestion.trueAnswer
        .toString()
        .toLowerCase()

      const userAnswer = userQuestion.answer.toString().toLowerCase()
      questionsAnswersCount++
      if (originalAnswer === userAnswer) trueQuestionsAnswersCount++
    })

    // Подсчёт результатов за практические задания
    practiceQuestions.map((userPracticeQuestion) => {
      const originalPracticeQuestion = originalPracticeQuestions.find(
        (originalPracticeQuestion) =>
          originalPracticeQuestion.id === userPracticeQuestion.questionId
      )
      if (!originalPracticeQuestion) return

      const userAnswer = userPracticeQuestion.answer

      questionsAnswersCount++

      const originalPracticeQuestionType = originalPracticeQuestion.type
      // Сравнение ответа под нужный тип задания
      // sampleFun - ответ высчитывается по формуле
      if (originalPracticeQuestionType === 'sampleFun') {
        const formule = eval(originalPracticeQuestion.answerFormule)
        const roundForce = originalPracticeQuestion.roundForce

        // Ответы на задание, которые должны быть (округленные до двух знаков после запятой)
        const originalAnswer = formule(userPracticeData).toFixed(2)
        const originalAnswersRound = [
          (+originalAnswer).toFixed(2),
          (+originalAnswer - roundForce).toFixed(2),
          (+originalAnswer + roundForce).toFixed(2),
        ]

        // Проверка на правильность ответа пользователем
        if (originalAnswersRound.includes(userAnswer.toFixed(2)))
          trueQuestionsAnswersCount++
      }
      // Другие типы заданий...
    })

    // Запись итогов и статистик
    const taskTimeRuntime = taskRuntime / 1000 - 1
    await UserModel.findOneAndUpdate(
      {
        _id: user._id,
        'tasks.id': userTaskId,
      },
      {
        $set: {
          'tasks.$.statistics': {
            taskRuntime: taskTimeRuntime,
            avarageQuestionTime: taskTimeRuntime / questionsAnswersCount,
            trueAnswersCount: trueQuestionsAnswersCount,
            answersCount: questionsAnswersCount,
          },
        },
      }
    )
  } catch (error) {
    serverError(error)
  }
}

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

    const originalTask = await TaskModel.findById(currentTask.originalTaskId)
    // Запуск таймера задания
    const timerTime = originalTask.timeForExecute // в секундах
    const requestRateTime = 1000 // как часто будут отправляться и изменяться запросы (в мс)
    const timerTimeMsc = timerTime * 1000
    let nowTime = 0
    // Работаем с созданием практических заданий (например, создаем выборку, по которой будут решаться задания)
    const practiceData = originalTask.forPracticeData
    const practiceDataType = practiceData.type
    let practiceDataForUserTask
    // Если тип randomNums (выборка)
    if (practiceDataType === 'randomNums') {
      // Вернёт массив выборки
      const formule = eval(practiceData.formule)

      practiceDataForUserTask = formule()
    }

    await UserModel.findOneAndUpdate(
      {
        _id: userId,
        'tasks.id': userTaskId,
      },
      {
        $set: {
          'tasks.$.nowTime': 0,
          'tasks.$.status': 'started',
          'tasks.$.questions': [],
          'tasks.$.practiceQuestions': [],
          'tasks.$.forPracticeData': practiceDataForUserTask,
        },
      }
    )

    const taskTimeInterval = setInterval(async () => {
      // Проверка не завершено ли задание уже (пользователь решил его раньше времени) (каждые 10 секунд проверка)
      if (nowTime % 1000 === 0) {
        const user = await UserModel.findById(userId)
        const currentTask = user.tasks.find((task) => task.id === userTaskId)
        if (currentTask.status === 'user_complete') {
          clearInterval(taskTimeInterval)
          const userFinal = await UserModel.findOneAndUpdate(
            {
              _id: userId,
              'tasks.id': userTaskId,
            },
            {
              $unset: { 'tasks.$.nowTime': 0 },
            }
          )
          // Подведение итогов
          return await calculationResults(
            userFinal,
            userTaskId,
            originalTask,
            nowTime
          )
        }
      }

      // Проверка не вышло ли время
      if (nowTime > timerTimeMsc) {
        // Завершение, если время вышло
        clearInterval(taskTimeInterval)
        const userFinal = await UserModel.findOneAndUpdate(
          {
            _id: userId,
            'tasks.id': userTaskId,
          },
          {
            $set: { 'tasks.$.status': 'complete' },
            $unset: { 'tasks.$.nowTime': 0 },
          }
        )
        // Подведение итогов
        return await calculationResults(
          userFinal,
          userTaskId,
          originalTask,
          nowTime
        )
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

// Пользователь раньше времени заканчивает задание
export const onEndUserTask = async (req, res) => {
  try {
    const userId = req.userId
    const userTaskId = req.params.taskId

    await UserModel.findOneAndUpdate(
      {
        _id: userId,
        'tasks.id': userTaskId,
      },
      {
        $set: {
          'tasks.$.status': 'user_complete',
        },
      }
    )

    res.json({ end: true })
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка завершения задания раньше времени',
    })
  }
}

// Отправка ответа в задание
export const sendQuestionAnswer = async (req, res) => {
  try {
    const userId = req.userId
    const userTaskId = req.params.taskId
    const user = req.user
    const currentTask = req.currentTask
    const questionId = req.body.questionId
    const answer = req.body.answer

    const newAnswer = {
      questionId,
      answer,
    }

    let newUser
    // Если ответы ещё не заносились
    if (!currentTask.questions) {
      newUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          'tasks.id': userTaskId,
        },
        {
          $set: {
            'tasks.$.questions': [newAnswer],
          },
        }
      )
    } else {
      // Если ответы уже были
      // Проверка, был ли занесен уже такой вопрос-ответ
      const isAnswerWasAlreadyIndex = currentTask.questions.findIndex(
        (question) => question.questionId === questionId
      )
      // Если нашел уже такой ответ
      if (isAnswerWasAlreadyIndex !== -1) {
        currentTask.questions.splice(isAnswerWasAlreadyIndex, 1)
      }

      newUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          'tasks.id': userTaskId,
        },
        {
          $set: {
            'tasks.$.questions': [
              ...(currentTask.questions ? currentTask.questions : {}),
              newAnswer,
            ],
          },
        },
        { new: true }
      )
    }

    // Отправка ответа
    const newUserTask = newUser.tasks.find(
      (tempTask) => tempTask.id === userTaskId
    )
    res.json({
      id: newUserTask.id,
      originalTaskId: newUserTask.originalTaskId,
      newTask: newUserTask.newTask,
      attemptsCount: newUserTask.attemptsCount,
      notTime: newUserTask.notTime,
      questions: newUserTask.questions,
      practiceQuestions: newUserTask.practiceQuestions,
    })
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка отправки ответа в задание',
    })
  }
}

// Отправка ответа в задание на практический вопрос
export const sendPracticeQuestionAnswer = async (req, res) => {
  try {
    const userId = req.userId
    const userTaskId = req.params.taskId
    const user = req.user
    const currentTask = req.currentTask
    const questionId = req.body.questionId
    const answer = req.body.answer

    const newAnswer = {
      questionId,
      answer,
    }

    let newUser
    // Если ответы ещё не заносились
    if (!currentTask.questions) {
      newUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          'tasks.id': userTaskId,
        },
        {
          $set: {
            'tasks.$.practiceQuestions': [newAnswer],
          },
        }
      )
    } else {
      // Если ответы уже были
      // Проверка, был ли занесен уже такой вопрос-ответ
      const isAnswerWasAlreadyIndex = currentTask.practiceQuestions.findIndex(
        (practiceQuestion) => practiceQuestion.questionId === questionId
      )
      // Если нашел уже такой ответ
      if (isAnswerWasAlreadyIndex !== -1) {
        currentTask.practiceQuestions.splice(isAnswerWasAlreadyIndex, 1)
      }

      newUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          'tasks.id': userTaskId,
        },
        {
          $set: {
            'tasks.$.practiceQuestions': [
              ...(currentTask.practiceQuestions
                ? currentTask.practiceQuestions
                : {}),
              newAnswer,
            ],
          },
        },
        { new: true }
      )
    }

    // Отправка ответа
    const newUserTask = newUser.tasks.find(
      (tempTask) => tempTask.id === userTaskId
    )
    res.json({
      id: newUserTask.id,
      originalTaskId: newUserTask.originalTaskId,
      newTask: newUserTask.newTask,
      attemptsCount: newUserTask.attemptsCount,
      notTime: newUserTask.notTime,
      questions: newUserTask.questions,
      practiceQuestions: newUserTask.practiceQuestions,
    })
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка отправки ответа в задание',
    })
  }
}
