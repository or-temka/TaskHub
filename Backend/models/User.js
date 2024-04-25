import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'student',
    },
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
    tasks: {
      type: Array,
      default: [],
    },
    statistics: {
      type: Object,
      default: {
        complitedTasks: 0,
        avarageMark: 0,
        avarageTaskTime: 0,
        avarageQuestionTime: 0,
      },
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', UserSchema)
