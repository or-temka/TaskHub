import { TOKEN_KEY } from '../PASSWORDS.js'

import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import UserModel from '../models/User.js'

export const reg = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const doc = new UserModel({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password,
    })

    let user
    try {
      user = await doc.save()
    } catch (error) {
      res
        .status(409)
        .json({ errorMsg: 'Пользователь с таким логином уже существует' })
      return
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      TOKEN_KEY
    )

    serverLog(`Новый пользователь: ${user.name}`)
    res.json({ token: token })
  } catch (error) {
    serverError(error)
    res
      .status(500)
      .json({ errorMsg: 'Произошла ошибка регистрации пользователя' })
  }
}

export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const user = await UserModel.findOne({ login: req.body.login })

    if (!user) {
      serverMsg(`Попытка входа: введен несуществующий логин ${req.body.login}`)
      return res.status(404).json({
        errorMsg: 'Неверный логин или пароль',
      })
    }

    if (req.body.password !== user._doc.password) {
      serverMsg(
        `Попытка входа: введен неверный пароль ${req.body.password} для аккаунта ${req.body.login}`
      )
      return res.status(404).json({
        errorMsg: 'Неверный логин или пароль',
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      TOKEN_KEY
    )

    serverLog(`Выполнен вход: ${req.body.login} вошел в аккаунт`)
    res.json({ token: token })
  } catch (error) {
    serverError(error)
    res.status(500).json({ errorMsg: 'Произошла ошибка входа в аккаунт' })
  }
}

export const getUserInfoMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user) {
      serverMsg(
        `Попытка получения данных о пользователе (о себе): не найден пользователь с id ${req.userId}`
      )
      return res.status(404).json({
        errorMsg: 'Пользователь не найден',
      })
    }

    const { password, ...userData } = user._doc

    serverMsg(`Получены данные о пользователе (о себе): ${userData.name}`)
    res.json(userData)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка получения данных о пользователе',
    })
  }
}

export const getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)

    if (!user) {
      serverMsg(
        `Попытка получения данных о пользователе: не найден пользователь с id ${req.body.userId}`
      )
      return res.status(404).json({
        errorMsg: 'Пользователь не найден',
      })
    }

    const { ...userData } = user._doc

    serverMsg(`Получены данные о пользователе: ${userData.name}`)
    res.json(userData)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка получения данных о пользователе',
    })
  }
}

export const getAllUsersInfo = async (req, res) => {
  try {
    const users = await UserModel.find()

    serverMsg(`Получены данные о всех пользователях`)
    res.json(users)
  } catch (error) {
    serverError(error)
    res.status(500).json({
      errorMsg: 'Ошибка получения данных о пользователях',
    })
  }
}

export const updateUserInfo = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const userId = req.params.id

    const existingUser = await UserModel.findById(userId)

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: req.body.name || existingUser.name,
          login: req.body.login || existingUser.login,
          password: req.body.password || existingUser.password,
          groupId: req.body.groupId || existingUser.groupId,
        },
      },
      { new: true }
    )

    serverLog(`Был обновлен пользователь ${existingUser.name}`)
    res.json(updatedUser)
  } catch (error) {
    serverError(error)
    res
      .status(500)
      .json({ errorMsg: 'Произошла ошибка изменения данных пользователя' })
  }
}
