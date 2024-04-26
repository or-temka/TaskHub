import { DB_LOGIN, DB_PASSWORD } from './PASSWORDS.js'

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { serverError, serverLog } from './utils/serverLog.js'

import { regUserValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js'
import checkIsTeacher from './utils/checkIsTeacher.js'
import * as UserController from './controllers/UserController.js'

mongoose
  .connect(
    `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@cluster0.rouuumh.mongodb.net/taskhub?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => serverLog('connected to DB'))
  .catch((err) => serverError('connected error to DB!!! Error: ' + err))

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

//#region User
// Регистрация пользователя
app.post('/user', regUserValidation, UserController.reg)
// Получение токена пользователя - вход в аккаунт
app.get('/user', UserController.login)
// Получение данных о пользователе (о себе)
app.get('/user/me', checkAuth, UserController.getUserInfoMe)
// Получение данных о пользователе
// Получение данных о пользователях
// Изменение данных о пользователе
// Удаление пользователя
//#endregion

//#region Group
// Создание группы
// Получение данных о группе
// Получение данных о группах
// Редактирование группы
// Удаление группы
//#endregion

//#region Task
// Получение данных о задание
// Получение данных о заданиях
//#endregion

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }
  serverLog('Server link: http://localhost:' + PORT)
})
