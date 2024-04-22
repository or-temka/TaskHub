export const tasks = [
  {
    id: 1,
    name: 'Поиск интегралов',
    timeForExecute: '350',
    instruction:
      'Пойти налево, а затем пойти направо, но уже намного быстрее, чем до этого',
    filesId: [1],
    questions: [
      {
        id: 1,
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
    ],
    practiceQuestions: [
      {
        id: 1,
        text: 'Какой-то классный текст для такой классной задачки',
        answers: [123, 124, 125],
        imagesSrc: ['zadasha.jpg'],
        unit: 'Кг.',
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
      avarageMark: 3.6,
      avarageTimeTask: 620,
      avarageTimeQuestion: 23,
      leastCorrectAnswers: 7,
      mostCorrectAnswers: 29,
    },
  },
]
