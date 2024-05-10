import { validationResult } from 'express-validator'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import TaskModel from '../models/Task.js'
import GroupModel from '../models/Group.js'
import UserModel from '../models/User.js'

import calculateGrade from '../utils/calculateGrade.js'

// Подсчёт результатов выполненного задания
const calculationResults = async (
  user,
  userTaskId,
  originalTask,
  taskRuntime
) => {
  try {
    const userTask = user.tasks.find((task) => task.id === userTaskId)
    const questions = userTask.answersOnQuestions
    const practiceQuestions = userTask.answersOnPracticeQuestions
    const originalQuestions = originalTask.questions
    const originalPracticeQuestions = originalTask.practiceQuestions
    const userPracticeData = userTask.forPracticeData
    const totalQuestions =
      originalTask.questions.length + originalTask.practiceQuestions.length

    let trueQuestionsAnswersCount = 0
    let questionsAnswersCount = 0

    // Подсчёт результатов за тест -------------------------------------------------------------------------------
    questions.map(async (userQuestion) => {
      const originalQuestion = originalQuestions.find(
        (originalQuestion) => originalQuestion.id === userQuestion.questionId
      )
      if (!originalQuestion) return

      const originalAnswer = originalQuestion.trueAnswer
        .toString()
        .toLowerCase()

      const userAnswer = userQuestion.answer.toString().toLowerCase()
      questionsAnswersCount++
      if (
        originalAnswer.toString().toLowerCase() ===
        userAnswer.toString().toLowerCase()
      )
        trueQuestionsAnswersCount++
    })

    // Подсчёт результатов за практические задания --------------------------------------------------------------
    practiceQuestions.map((userPracticeQuestion) => {
      const originalPracticeQuestion = originalPracticeQuestions.find(
        (originalPracticeQuestion) =>
          originalPracticeQuestion.id === userPracticeQuestion.questionId
      )
      if (!originalPracticeQuestion) return

      const userAnswer = userPracticeQuestion.answer
      const userAnswerAsNumber = Number(userAnswer) ? Number(userAnswer) : 0

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
          (+originalAnswer - roundForce * 2).toFixed(2),
          (+originalAnswer + roundForce * 2).toFixed(2),
        ]

        // Проверка на правильность ответа пользователем
        if (originalAnswersRound.includes(userAnswerAsNumber.toFixed(2)))
          trueQuestionsAnswersCount++
      }
      // Другие типы заданий...
    })

    // Запись итогов и статистик -----------------------------------------------------------
    // В пользовательское задание ------------------------
    // Вычисление оценки
    let tempMark = calculateGrade(trueQuestionsAnswersCount, totalQuestions)
    tempMark = +tempMark > 2 ? +tempMark : 2
    const mark =
      userTask.notRoundMark > tempMark ? userTask.notRoundMark : tempMark // Если оценка "до" была лучше
    const roundedMark = Math.round(mark)
    // Запись данных
    const taskTimeRuntime = taskRuntime / 1000 - 1
    await UserModel.findOneAndUpdate(
      {
        _id: user._id,
        'tasks.id': userTaskId,
      },
      {
        $set: {
          'tasks.$.statistics': {
            taskRuntime: taskTimeRuntime ? taskTimeRuntime : 0,
            avarageQuestionTime: questionsAnswersCount
              ? taskTimeRuntime / questionsAnswersCount
              : 0,
            trueAnswersCount: trueQuestionsAnswersCount,
            answersCount: questionsAnswersCount,
          },
          'tasks.$.mark': roundedMark,
          'tasks.$.notRoundMark': mark,
        },
      }
    )

    // В самого пользователя (его статистика)
    const userComplitedTasks = user.statistics.complitedTasks
      ? user.statistics.complitedTasks
      : 0
    await UserModel.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          statistics: {
            complitedTasks: userComplitedTasks + 1,
            avarageMark: user.statistics.avarageMark
              ? (user.statistics.avarageMark * userComplitedTasks + tempMark) /
                (userComplitedTasks + 1)
              : tempMark,
            avarageTaskTime: user.statistics.avarageTimeTask
              ? (user.statistics.avarageTimeTask * userComplitedTasks +
                  taskTimeRuntime) /
                (userComplitedTasks + 1)
              : taskTimeRuntime,
            avarageQuestionTime: user.statistics.avarageTimeQuestion
              ? (user.statistics.avarageTimeQuestion * userComplitedTasks +
                  taskTimeRuntime / questionsAnswersCount) /
                (userComplitedTasks + 1)
              : questionsAnswersCount
              ? taskTimeRuntime / questionsAnswersCount
              : 0,
          },
        },
      }
    )

    // В оригинальное задание ---------------------------
    const oldOriginalTaskStatistic = originalTask.statistic
    const originalTaskExecuted = +oldOriginalTaskStatistic.executedCount
    const newStatisticForOriginalTask = {
      executedCount: originalTaskExecuted + 1,
      avarageMark:
        (oldOriginalTaskStatistic.avarageMark * originalTaskExecuted +
          tempMark) /
        (originalTaskExecuted + 1),
      avarageTimeTask:
        (oldOriginalTaskStatistic.avarageTimeTask * originalTaskExecuted +
          taskTimeRuntime) /
        (originalTaskExecuted + 1),
      avarageTimeQuestion:
        (oldOriginalTaskStatistic.avarageTimeQuestion * originalTaskExecuted +
          taskTimeRuntime / questionsAnswersCount) /
        (originalTaskExecuted + 1),
      leastCorrectAnswers:
        oldOriginalTaskStatistic.leastCorrectAnswers > trueQuestionsAnswersCount
          ? trueQuestionsAnswersCount
          : oldOriginalTaskStatistic.leastCorrectAnswers,
      mostCorrectAnswers:
        oldOriginalTaskStatistic.mostCorrectAnswers < trueQuestionsAnswersCount
          ? trueQuestionsAnswersCount
          : oldOriginalTaskStatistic.mostCorrectAnswers,
    }

    await TaskModel.findOneAndUpdate(
      {
        _id: originalTask._id,
      },
      {
        $set: {
          statistic: {
            ...oldOriginalTaskStatistic,
            ...newStatisticForOriginalTask,
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
      return res.status(404).json({
        errorMsg: 'Не найден пользователь',
      })
    }

    const currentTask = user.tasks.find((task) => task.id === userTaskId)
    // Работа с попытками
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
    // Проверка, что задание уже не начато
    if (currentTask.status === 'started') {
      return res.status(409).json({
        errorMsg: 'Задание уже начато.',
      })
    }
    // Идем дальше, если всё ок
    await UserModel.findOneAndUpdate(
      {
        _id: userId,
        'tasks.id': userTaskId,
      },
      { $set: { 'tasks.$.attemptsCount': currentAttemptsTaskCount - 1 } }
    )

    const originalTask = await TaskModel.findById(currentTask.originalTaskId)
    // Если задание никогда не выполнялось
    if (currentTask.status === 'not_started') {
      originalTask.statistic.usersExecuted++
    }

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
          'tasks.$.answersOnQuestions': [],
          'tasks.$.answersOnPracticeQuestions': [],
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
      errorMsg: 'Ошибка начала задания',
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
    if (!currentTask.answersOnQuestions) {
      newUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          'tasks.id': userTaskId,
        },
        {
          $set: {
            'tasks.$.answersOnQuestions': [newAnswer],
          },
        }
      )
    } else {
      // Если ответы уже были
      // Проверка, был ли занесен уже такой вопрос-ответ
      const isAnswerWasAlreadyIndex = currentTask.answersOnQuestions.findIndex(
        (answerOnQuestion) => answerOnQuestion.questionId === questionId
      )
      // Если нашел уже такой ответ
      if (isAnswerWasAlreadyIndex !== -1) {
        currentTask.answersOnQuestions.splice(isAnswerWasAlreadyIndex, 1)
      }

      newUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          'tasks.id': userTaskId,
        },
        {
          $set: {
            'tasks.$.answersOnQuestions': [
              ...(currentTask.answersOnQuestions
                ? currentTask.answersOnQuestions
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
      answersOnQuestions: newUserTask.answersOnQuestions,
      answersOnPracticeQuestions: newUserTask.answersOnPracticeQuestions,
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
    if (!currentTask.answersOnPracticeQuestions) {
      newUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          'tasks.id': userTaskId,
        },
        {
          $set: {
            'tasks.$.answersOnPracticeQuestions': [newAnswer],
          },
        }
      )
    } else {
      // Если ответы уже были
      // Проверка, был ли занесен уже такой вопрос-ответ
      const isAnswerWasAlreadyIndex =
        currentTask.answersOnPracticeQuestions.findIndex(
          (answerOnPracticeQuestion) =>
            answerOnPracticeQuestion.questionId === questionId
        )
      // Если нашел уже такой ответ
      if (isAnswerWasAlreadyIndex !== -1) {
        currentTask.answersOnPracticeQuestions.splice(
          isAnswerWasAlreadyIndex,
          1
        )
      }

      newUser = await UserModel.findOneAndUpdate(
        {
          _id: userId,
          'tasks.id': userTaskId,
        },
        {
          $set: {
            'tasks.$.answersOnPracticeQuestions': [
              ...(currentTask.answersOnPracticeQuestions
                ? currentTask.answersOnPracticeQuestions
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
      answersOnQuestions: newUserTask.answersOnQuestions,
      answersOnPracticeQuestions: newUserTask.answersOnPracticeQuestions,
    })
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка отправки ответа в задание',
    })
  }
}

// Получение основной информации о задании для его выполнения
export const getMyUserTaskPerform = async (req, res) => {
  try {
    const userId = req.userId
    const userTaskId = req.params.taskId

    const user = await UserModel.findById(userId)
    if (!user) {
      serverMsg(
        `Попытка получения данных о задании пользователя: не найден пользователь с id ${userId}`
      )
      return res.status(404).json({
        errorMsg: 'Пользователь не найден',
      })
    }

    const userTask = user._doc.tasks.find(
      (userTask) => userTask.id === userTaskId
    )
    if (!userTask) {
      serverMsg(
        `Попытка получения данных о задании пользователя: не найдено задание с id ${userTaskId}`
      )
      return res.status(404).json({
        errorMsg: 'Задание не найдено у пользователя',
      })
    }

    const originalTask = await TaskModel.findById(userTask.originalTaskId)
    if (!originalTask) {
      serverMsg(
        `Попытка получения данных о задании пользователя: не найдено оригинальное задание с id ${userTask.originalTaskId}`
      )
      return res.status(404).json({
        errorMsg: 'Оригинальное задание не найдено',
      })
    }

    // Рефакторинг вопросов перед выдачей их пользователю (чтобы он не знал ответов) ---------
    // обычных вопросов
    const refQuestions = originalTask.questions.map((question) => ({
      id: question.id,
      questionText: question.questionText,
      type: question.type,
      ...(question.type === 'choice' ? { answers: question.answers } : {}), // Для вопроса с выбором будут передаваться и варианты ответа
    }))
    // практических вопросов
    const refPracticeQuestions = originalTask.practiceQuestions.map(
      (practiceQuestion) => ({
        id: practiceQuestion.id,
        text: practiceQuestion.text,
        ...(practiceQuestion.roundForce
          ? { roundForce: practiceQuestion.roundForce }
          : {}), // Если указано округление
      })
    )
    // Запись всех данных для отправки --------
    const newTask = {
      // from myself
      id: userTask.id,
      originalTaskId: userTask.originalTaskId,
      attemptsCount: userTask.attemptsCount,
      forPracticeData: userTask.forPracticeData,
      answersOnQuestions: userTask.answersOnQuestions,
      answersOnPracticeQuestions: userTask.answersOnPracticeQuestions,
      mark: userTask.mark,
      nowTime: userTask.nowTime,
      notRoundMark: userTask.notRoundMark,
      // from original
      name: originalTask.name,
      forPracticeDataType: originalTask.forPracticeData.type,
      filesId: originalTask.filesId,
      questions: refQuestions,
      practiceQuestions: refPracticeQuestions,
      timeForExecute: originalTask.timeForExecute,
      questionsCount: originalTask.questions.length,
      practiceQuestionsCount: originalTask.practiceQuestions.length,
      answersTable: originalTask.answersTable,
    }

    serverMsg(
      `Получены данные для выполнения о задании "${newTask.name}" пользователя (о себе) "${user.name}"`
    )
    res.json(newTask)
  } catch (error) {
    serverError(error)
    res.status(500).json({ errorMsg: 'Произошла ошибка получения заданий' })
  }
}
