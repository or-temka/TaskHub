import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    timeForExecute: {
      type: Number,
      required: true,
      default: 600,
    },
    attempts: {
      type: Number,
      required: true,
      default: 3,
    },
    instruction: String,
    filesId: {
      type: Array,
      default: [],
    },
    questions: {
      type: Array,
      default: [],
    },
    practiceQuestions: {
      type: Array,
      default: [],
    },
    answersTable: {
      type: Array,
      default: [],
    },
    statistic: {
      type: Object,
      default: {},
    },
    forPracticeData: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Task', TaskSchema)
