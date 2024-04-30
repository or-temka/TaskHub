export const tasks = [
  {
    id: 1,
    name: 'Поиск интегралов',
    timeForExecute: '350',
    attempts: 3,
    instruction:
      'Пойти налево, а затем пойти направо, но уже намного быстрее, чем до этого',
    filesId: [1],
    answersTable: [
      { id: 1, imgSrc: '1.png' },
      { id: 2, imgSrc: '2.png' },
      { id: 3, imgSrc: '3.png' },
      { id: 4, imgSrc: '4.png' },
      { id: 5, imgSrc: '5.png' },
      { id: 6, imgSrc: '6.png' },
      { id: 7, imgSrc: '7.png' },
      { id: 8, imgSrc: '8.png' },
      { id: 9, imgSrc: '9.png' },
      { id: 10, imgSrc: '10.png' },
      { id: 11, imgSrc: '11.png' },
      { id: 12, imgSrc: '12.png' },
      { id: 13, imgSrc: '13.png' },
      { id: 14, imgSrc: '14.png' },
      { id: 15, imgSrc: '15.png' },
      { id: 16, imgSrc: '16.png' },
      { id: 17, imgSrc: '17.png' },
      { id: 18, imgSrc: '18.png' },
      { id: 19, imgSrc: '19.png' },
      { id: 20, imgSrc: '20.png' },
      { id: 21, imgSrc: '21.png' },
      { id: 22, imgSrc: '22.png' },
      { id: 23, imgSrc: '23.png' },
      { id: 24, imgSrc: '24.png' },
    ],
    questions: [
      {
        id: 1,
        type: 'choice',
        questionText: 'В каком году родился Пётр 1?',
        answers: [
          {
            id: 1,
            text: 'В 1 году',
          },
          {
            id: 2,
            text: 'Во 2 году',
          },
          {
            id: 3,
            text: 'В 3 году',
          },
          {
            id: 4,
            text: 'В 4 году',
          },
        ],
        trueAnswerId: 2,
      },
      {
        id: 2,
        type: 'choice',
        questionText: 'Как посадить дерево?',
        answers: [
          {
            id: 1,
            text: 'В один присест',
          },
          {
            id: 2,
            text: 'В два присеста',
          },
          {
            id: 3,
            text: 'Не садить',
          },
          {
            id: 4,
            text: 'Посадить стоя',
          },
        ],
        trueAnswerId: 4,
      },
      {
        id: 3,
        type: 'enterFormuleNum',
        questionText: 'По какой формуле вычисляется выборочное среднее?',
        trueAnswer: 3,
      },
      {
        id: 4,
        type: 'enterFormuleNum',
        questionText: 'По какой формуле вычисляется выборочное среднее?',
        trueAnswer: 2,
      },
    ],
    practiceQuestions: [
      {
        id: 1,
        text: 'Какой-то классный текст для такой классной задачки',
        answers: [123, 124, 125],
        beforeAnswerText: 'Вес равен',
      },
      {
        id: 2,
        text: 'Уже вторая задача с более интересным текстом',
        answersSrc: [33, 44, 55],
        images: [],
        unit: 'н.',
      },
    ],
    statistic: {
      usersExecuted: 2,
      executedCount: 4,
      avarageMark: 3.5,
      avarageTimeTask: 620,
      avarageTimeQuestion: 23,
      leastCorrectAnswers: 7,
      mostCorrectAnswers: 29,
    },
  },
  {
    id: 2,
    name: 'Вычисление по ip',
    timeForExecute: '550',
    attempts: 3,
    instruction: 'Раскидать всех налево и направо',
    filesId: [],
    questions: [
      {
        id: 1,
        questionText: 'как дела у тебя в школе?',
        answers: [
          {
            id: 1,
            text: 'Нормально',
          },
          {
            id: 2,
            text: 'Ок',
          },
          {
            id: 3,
            text: 'Неплохо',
          },
          {
            id: 4,
            text: 'Могло быть и лучше',
          },
        ],
        trueAnswerId: 2,
      },
      {
        id: 2,
        questionText:
          'Как узнать сколько лет потребуется, чтобы дойти до Китая?',
        answers: [
          {
            id: 1,
            text: 'Посмотреть вперед',
          },
          {
            id: 2,
            text: 'Посмотреть назад',
          },
          {
            id: 3,
            text: 'Выучить карту мира и понять',
          },
          {
            id: 4,
            text: 'Просто понять',
          },
        ],
        trueAnswerId: 4,
      },
      {
        id: 3,
        questionText: 'Зачем?',
        answers: [
          {
            id: 1,
            text: 'Затем',
          },
          {
            id: 2,
            text: 'Потому что',
          },
          {
            id: 3,
            text: 'Так как',
          },
          {
            id: 4,
            text: 'В связи с тем, что...',
          },
        ],
        trueAnswerId: 4,
      },
      {
        id: 4,
        questionText: 'Почему?',
        answers: [
          {
            id: 1,
            text: 'Потому',
          },
          {
            id: 2,
            text: 'По качену',
          },
          {
            id: 3,
            text: 'По одному',
          },
          {
            id: 4,
            text: 'Просто промолчу',
          },
        ],
        trueAnswerId: 4,
      },
    ],
    practiceQuestions: [],
    statistic: {
      usersExecuted: 53,
      executedCount: 33,
      avarageMark: 2.2,
      avarageTimeTask: 1030,
      avarageTimeQuestion: 520,
      leastCorrectAnswers: 2,
      mostCorrectAnswers: 4,
    },
  },
]
