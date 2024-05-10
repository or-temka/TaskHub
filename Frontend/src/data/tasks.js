export const tasks = [
  {
    // Первое задание
    _id: {
      $oid: '662b7a873e1862b07e5bd6c5',
    },
    name: 'Описательная статистика',
    timeForExecute: 500,
    attempts: 3,
    instruction: 'Выполните задания.',
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
        type: 'choice',
        trueAnswer: 2,
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
        trueAnswer: 4,
        type: 'choice',
      },
      {
        id: 3,
        questionText: 'Какая формула соответствует ',
        trueAnswer: '2',
        type: 'enter',
      },
      {
        id: 4,
        questionText: 'Какая-то мега выбор 2',
        trueAnswer: '4',
        type: 'enter',
      },
    ],
    practiceQuestions: [
      {
        id: 1,
        text: 'Для данной выборки вычислить выборочное среднее.',
        answerFormule:
          '(numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const mean = sum / numbers.length;return mean;}',
        roundForce: 0.01,
        imgSrc: 'imageName',
        type: 'sampleFun',
      },
      {
        id: 2,
        text: 'Найти медиану выборки.',
        answerFormule:
          '(numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const sortedNumbers = numbers.slice().sort((a, b) => a - b);const middle = Math.floor(sortedNumbers.length / 2);if (sortedNumbers.length % 2 === 0) {return (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;} else {return sortedNumbers[middle];}}',
        roundForce: 0.01,
        imgSrc: 'imageName',
        type: 'sampleFun',
      },
      {
        id: 3,
        text: 'Вычислить среднее абсолютное отклонение для данной выборки.',
        answerFormule:
          '(numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const calculateMean = (numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const mean = sum / numbers.length;return mean;};const mean = calculateMean(numbers);const absoluteDeviations = numbers.map(number => Math.abs(number - mean));const sumOfAbsoluteDeviations = absoluteDeviations.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const meanAbsoluteDeviation = sumOfAbsoluteDeviations / numbers.length;return meanAbsoluteDeviation;}',
        roundForce: 0.01,
        type: 'sampleFun',
      },
      {
        id: 4,
        text: 'Вычислить выборочную дисперсию.',
        answerFormule:
          '(numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const calculateMean = (numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const mean = sum / numbers.length;return mean;};const mean = calculateMean(numbers);const squaredDifferences = numbers.map(number => Math.pow(number - mean, 2));const sumOfSquaredDifferences = squaredDifferences.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const sampleVariance = sumOfSquaredDifferences / (numbers.length - 1);return sampleVariance;}',
        roundForce: 0.01,
        type: 'sampleFun',
      },
      {
        id: 5,
        text: 'Найти размах выборки.',
        answerFormule:
          '(numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const min = Math.min(...numbers);const max = Math.max(...numbers);const range = max - min;return range;}',
        roundForce: 0.01,
        type: 'sampleFun',
      },
      {
        id: 6,
        text: 'Для данной выборки вычислить выборочное среднеквадратическое отклонение.',
        answerFormule:
          '(numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const calculateMean = (numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const mean = sum / numbers.length;return mean;};const mean = calculateMean(numbers);const squaredDifferences = numbers.map(number => Math.pow(number - mean, 2));const sumOfSquaredDifferences = squaredDifferences.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const sampleVariance = sumOfSquaredDifferences / (numbers.length - 1);const standardDeviation = Math.sqrt(sampleVariance);return standardDeviation;}',
        roundForce: 0.01,
        type: 'sampleFun',
      },
      {
        id: 7,
        text: 'Вычислить выборочную асимметрию для данной выборки.',
        answerFormule:
          '(numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const calculateStandardDeviation = (numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const calculateMean = (numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const mean = sum / numbers.length;return mean;};const mean = calculateMean(numbers);const squaredDifferences = numbers.map(number => Math.pow(number - mean, 2));const sumOfSquaredDifferences = squaredDifferences.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const sampleVariance = sumOfSquaredDifferences / (numbers.length - 1);const standardDeviation = Math.sqrt(sampleVariance);return standardDeviation;};const calculateMean = (numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const mean = sum / numbers.length;return mean;};const mean = calculateMean(numbers);const n = numbers.length;const sumCubedDifferences = numbers.reduce((accumulator, currentValue) => accumulator + Math.pow(currentValue - mean, 3), 0);const sampleStandardDeviation = calculateStandardDeviation(numbers);const skewness = (n * sumCubedDifferences) / ((n - 1) * (n - 2) * Math.pow(sampleStandardDeviation, 3));return skewness;}',
        roundForce: 0.01,
        type: 'sampleFun',
      },
      {
        id: 8,
        text: 'Найти выборочный коэффициент вариации.',
        answerFormule:
          '(numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const calculateStandardDeviation = (numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const calculateMean = (numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const mean = sum / numbers.length;return mean;};const mean = calculateMean(numbers);const squaredDifferences = numbers.map(number => Math.pow(number - mean, 2));const sumOfSquaredDifferences = squaredDifferences.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const sampleVariance = sumOfSquaredDifferences / (numbers.length - 1);const standardDeviation = Math.sqrt(sampleVariance);return standardDeviation;};const sampleStandardDeviation = calculateStandardDeviation(numbers);const calculateMean = (numbers) => {if (!Array.isArray(numbers) || numbers.length === 0) {return 0;}const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);const mean = sum / numbers.length;return mean;};const mean = calculateMean(numbers);const coefficientOfVariation = (sampleStandardDeviation / mean) * 100;return coefficientOfVariation;}',
        roundForce: 0.01,
        type: 'sampleFun',
      },
    ],
    statistic: {
      usersExecuted: 0,
      executedCount: 0,
      avarageMark: 0,
      avarageTimeTask: 0,
      avarageTimeQuestion: 0,
      leastCorrectAnswers: 0,
      mostCorrectAnswers: 0,
    },
    forPracticeData: {
      formule:
        '(n = 10, s = 0, f = 100) => { const randomNumbers = []; for (let i = 0; i < n; i++) { const randomNumber = (Math.random() * (f - s) + s).toFixed(2); randomNumbers.push(parseFloat(randomNumber)); } return randomNumbers; }',
      type: 'randomNums',
    },
    answersTable: [
      {
        id: 1,
        imgSrc: '1.png',
      },
      {
        id: 2,
        imgSrc: '2.png',
      },
      {
        id: 3,
        imgSrc: '3.png',
      },
      {
        id: 4,
        imgSrc: '4.png',
      },
      {
        id: 5,
        imgSrc: '5.png',
      },
      {
        id: 6,
        imgSrc: '6.png',
      },
      {
        id: 7,
        imgSrc: '7.png',
      },
      {
        id: 8,
        imgSrc: '8.png',
      },
      {
        id: 9,
        imgSrc: '9.png',
      },
      {
        id: 10,
        imgSrc: '10.png',
      },
      {
        id: 11,
        imgSrc: '11.png',
      },
      {
        id: 12,
        imgSrc: '12.png',
      },
      {
        id: 13,
        imgSrc: '13.png',
      },
      {
        id: 14,
        imgSrc: '14.png',
      },
      {
        id: 15,
        imgSrc: '15.png',
      },
      {
        id: 16,
        imgSrc: '16.png',
      },
      {
        id: 17,
        imgSrc: '17.png',
      },
      {
        id: 18,
        imgSrc: '18.png',
      },
      {
        id: 19,
        imgSrc: '19.png',
      },
      {
        id: 20,
        imgSrc: '20.png',
      },
      {
        id: 21,
        imgSrc: '21.png',
      },
      {
        id: 22,
        imgSrc: '22.png',
      },
      {
        id: 23,
        imgSrc: '23.png',
      },
      {
        id: 24,
        imgSrc: '24.png',
      },
    ],
    updatedAt: {
      $date: '2024-05-09T11:16:31.552Z',
    },
  },
]
