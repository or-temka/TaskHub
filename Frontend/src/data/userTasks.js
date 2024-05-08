export const userTasks = [
  {
    id: 1,
    originalTaskId: 1,
    status: 'not_started',
    mark: 4,
    notRoundMark: 3.6,
    newTask: false,
    dateCreate: '12 марта в 10:00',
    attemptsCount: 2,
    statistics: {
      taskRuntime: 560,
      avarageQuestionTime: 15,
      trueAnswersCount: 4,
    },
    questions: [{ qustionId: 1, answer: 2 }],
    forPracticeData: [1, 3, 6, 7, 2],
    practiceQuestions: [
      {
        qustionId: 1,
        answer: 'Привет',
      },
    ],
  },
  {
    id: 2,
    originalTaskId: 2,
    newTask: true,
    dateCreate: '10 марта в 10:55',
    attemptsCount: 3,
  },
]
