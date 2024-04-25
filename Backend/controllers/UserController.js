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
