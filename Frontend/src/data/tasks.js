export const tasks = [
  {
    id: 1,
    name: 'Поиск интегралов',
    timeForExecute: '650',
    instruction:
      'Пойти налево, а затем пойти направо, но уже намного быстрее, чем до этого',
    filesId: [1],
    text: 'Пойти налево, а затем направо',
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
    ],
    practiceQuestions: [
      {
        id: 1,
      },
    ],
  },
]
