import { DB_LOGIN, DB_PASSWORD } from './PASSWORDS.js'

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { serverError, serverLog } from './utils/serverLog.js'

import * as validation from './validations.js'
import checkAuth from './utils/checkAuth.js'
import checkIsTeacher from './utils/checkIsTeacher.js'
import * as UserController from './controllers/UserController.js'
import * as GroupController from './controllers/GroupController.js'
import * as TaskController from './controllers/TaskController.js'
import * as UserTaskController from './controllers/UserTaskController.js'
import * as GroupServices from './services/GroupServices.js'
import * as UserServices from './services/UserServices.js'
import * as UserTaskServices from './services/UserTaskServices.js'

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

//#region services
//#region group
// Добавление пользователя в группу (также удаление из прошлой группы, если она была)
app.patch(
  '/group/add_user_in_group/:groupId',
  checkAuth,
  checkIsTeacher,
  GroupServices.addStudentInGroup
)
// Удаление пользователя из группы (также удаляется данная группа у пользователя)
app.patch(
  '/group/del_user_from_group/:groupId',
  checkAuth,
  checkIsTeacher,
  GroupServices.delStudentFromGroup
)
//#endregion
//#region user
// Удаление пользователя из группы только по id пользователя
app.patch(
  '/user/del_group_from_user/:userId',
  checkAuth,
  checkIsTeacher,
  UserServices.delGroupFromStudent
)
// Получение пользователей, у которых нет определенного задания
app.get(
  '/user/users_without_task/:taskId',
  checkAuth,
  checkIsTeacher,
  UserServices.getUsersWithoutTask
)
//#endregion
//#region UserTask
// Изменения статуса задания пользователя с newTask "true" -> "false"
app.patch(
  '/userTask/mark_task_not_new/:taskId',
  checkAuth,
  UserTaskServices.markUserTaskNotNew
)
//#endregion
//#endregion

//#region User ---------------------------------------------------------------
// Регистрация пользователя (возможно, с группой)
app.post(
  '/user/reg',
  checkAuth,
  checkIsTeacher,
  validation.regUserValidation,
  UserController.reg
)
// Регистрация сразу нескольких пользователей (возможно, с группой)
app.post(
  '/user/regMany',
  checkAuth,
  checkIsTeacher,
  validation.regManyUsersValidation,
  UserController.regMany
)
// Получение токена пользователя - вход в аккаунт
app.post('/user/login', UserController.login)
// Получение данных о пользователе (о себе)
app.get('/user/me', checkAuth, UserController.getUserInfoMe)
// Получение данных о пользователях
app.get('/user/all', checkAuth, checkIsTeacher, UserController.getAllUsersInfo)
// Получение данных о пользователе
app.get('/user/:id', checkAuth, checkIsTeacher, UserController.getUserInfo)
// Изменение данных о пользователе (о себе)
app.patch(
  '/user',
  checkAuth,
  validation.updateUserValidation,
  UserController.updateMyUserInfo
)
// Изменение данных о пользователе
app.patch(
  '/user/:id',
  checkAuth,
  checkIsTeacher,
  validation.updateUserValidation,
  UserController.updateUserInfo
)
// Удаление пользователя (себя)
app.delete('/user', checkAuth, UserController.deleteMyUser)
// Удаление пользователя
app.delete('/user/:id', checkAuth, checkIsTeacher, UserController.deleteUser)
//#endregion

//#region Group --------------------------------------------------------------
// Создание группы
app.post(
  '/group',
  checkAuth,
  checkIsTeacher,
  validation.createGroupValidation,
  GroupController.create
)
// Получение данных о группе (о своей)
app.get('/group', checkAuth, GroupController.getMyGroupInfo)
// Получение данных о всех группах
app.get(
  '/group/all',
  checkAuth,
  checkIsTeacher,
  GroupController.getAllGroupsInfo
)
// Получение данных о группе
app.get('/group/:id', checkAuth, checkIsTeacher, GroupController.getGroupInfo)
// Редактирование группы
app.patch(
  '/group/:id',
  checkAuth,
  checkIsTeacher,
  validation.updateGroupValidation,
  GroupController.update
)
// Удаление группы
app.delete('/group/:id', checkAuth, checkIsTeacher, GroupController.deleteGroup)
//#endregion

//#region Task ---------------------------------------------------------------
// Получение данных о заданиях
app.get('/task/all', checkAuth, checkIsTeacher, TaskController.getAllTasks)
// Получение данных о задании
app.get('/task/:id', checkAuth, checkIsTeacher, TaskController.getTask)
//#endregion

//#region UserTask ------------------------------------------------------------
// Получение заданиий пользователя (о себе)
app.get('/userTask/all', checkAuth, UserTaskController.getMyUserTasks)
// Получение задания пользователя (о себе)
app.get('/userTask/my/:taskId', checkAuth, UserTaskController.getMyUserTask)
// Добавление задания пользователя
app.post(
  '/userTask/:userId',
  checkAuth,
  checkIsTeacher,
  validation.addUserTaskValidation,
  UserTaskController.add
)
// Добавление задания пользователям группы
app.post(
  '/userTask/group/:groupId',
  checkAuth,
  checkIsTeacher,
  validation.addUserTaskValidation,
  UserTaskController.addForGroup
)
// Получение задания пользователя
app.get(
  '/userTask/:userId',
  checkAuth,
  checkIsTeacher,
  UserTaskController.getUserTask
)

// Получение заданиий пользователя
app.get(
  '/userTask/all/:userId',
  checkAuth,
  checkIsTeacher,
  UserTaskController.getAllUserTasks
)
// Изменение задания пользователя (о себе)
// Изменение задания пользователя
app.patch(
  '/userTask/:userId',
  checkAuth,
  checkIsTeacher,
  validation.updateUserTaskValidation,
  UserTaskController.updateUserTask
)
//#endregion

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }
  serverLog('Server link: http://localhost:' + PORT)
})
