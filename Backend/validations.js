import { body } from 'express-validator'

export const regUserValidation = [
  body('name')
    .isString()
    .withMessage('ФИО должно быть строкой')
    .isLength({
      min: 5,
      max: 200,
    })
    .withMessage('ФИО пользователя должно содержать от 5 до 200 символов'),

  body('login')
    .isString()
    .withMessage('Логин должен быть строкой')
    .isLength({
      min: 1,
      max: 30,
    })
    .withMessage('Логин должен содержать от 1 до 30 символов'),

  body('password')
    .isString()
    .withMessage('Пароль должен быть строкой')
    .isLength({
      min: 6,
      max: 30,
    })
    .withMessage('Пароль должен содержать от 6 до 30 символов'),
]

export const updateUserValidation = [
  body('name')
    .optional()
    .isString()
    .withMessage('ФИО должно быть строкой')
    .isLength({
      min: 5,
      max: 200,
    })
    .withMessage('ФИО пользователя должно содержать от 5 до 200 символов'),

  body('login')
    .optional()
    .isString()
    .withMessage('Логин должен быть строкой')
    .isLength({
      min: 1,
      max: 30,
    })
    .withMessage('Логин должен содержать от 1 до 30 символов'),

  body('password')
    .optional()
    .isString()
    .withMessage('Пароль должен быть строкой')
    .isLength({
      min: 6,
      max: 30,
    })
    .withMessage('Пароль должен содержать от 6 до 30 символов'),
]
