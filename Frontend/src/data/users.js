const users = [
  {
    // Учитель
    _id: {
      $oid: '662b37c90d719b7f007f313b',
    },
    name: 'Королев Леонид Владимирович',
    role: 'teacher',
    login: 'korolev',
    password: '123456',
    tasks: [],
    statistics: {
      complitedTasks: 0,
      avarageMark: 0,
      avarageTaskTime: 0,
      avarageQuestionTime: 0,
    },
    createdAt: {
      $date: '2024-04-26T05:12:41.577Z',
    },
    updatedAt: {
      $date: '2024-04-26T05:12:41.577Z',
    },
    __v: 0,
  },
  // Студенты
  {
    _id: {
      $oid: '6634a88cdeef9a6961d0d88f',
    },
    name: 'Волнухин М.А.',
    role: 'student',
    login: 'volnukhin.m',
    password: 'tLb1ELIK5TOs',
    groupId: {
      $oid: '6634a88cdeef9a6961d0d88c',
    },
    tasks: [],
    statistics: {
      complitedTasks: 0,
      avarageMark: 0,
      avarageTaskTime: 0,
      avarageQuestionTime: 0,
    },
    __v: 0,
    createdAt: {
      $date: '2024-05-03T09:04:12.920Z',
    },
    updatedAt: {
      $date: '2024-05-09T11:18:55.266Z',
    },
  },
]

export default users
