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
        trueAnswer: 2,
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
        trueAnswer: 4,
      },
      {
        id: 3,
        type: 'enter',
        questionText: 'По какой формуле вычисляется выборочное среднее?',
        trueAnswer: 3,
      },
      {
        id: 4,
        type: 'enter',
        questionText: 'По какой формуле вычисляется выборочное среднее?',
        trueAnswer: 2,
      },
    ],
    forPracticeData: {
      type: 'randomNums',
      formule:
        '(n = 30, s = 0, f = 100) => { const randomNumbers = []; for (let i = 0; i < n; i++) { const randomNumber = (Math.random() * (f - s) + s).toFixed(2); randomNumbers.push(parseFloat(randomNumber)); } return randomNumbers; }',
    },
    practiceQuestions: [
      {
        id: 1,
        text: 'Для данной выборки вычислить выборочное среднее.',
        answerFormule: 'function ...',
        roundForce: 0.01, // На сколько может разниться ответ
      },
      // {
      //   id: 2,
      //   text: 'Уже вторая задача с более интересным текстом',
      //   answersSrc: [33, 44, 55],
      //   images: [],
      //   unit: 'н.',
      //   beforeAnswerText: 'Вес равен',
      // },
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
]
