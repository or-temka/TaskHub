import { TOKEN_KEY } from '../PASSWORDS.js'

import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { serverError, serverLog, serverMsg } from '../utils/serverLog.js'
import UserModel from '../models/User.js'

export const reg = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    // hashing password
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      name: req.body.name,
      role: req.body.role,
      login: req.body.login,
      password: hashedPassword,
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

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.password
    )

    if (!isValidPass) {
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
