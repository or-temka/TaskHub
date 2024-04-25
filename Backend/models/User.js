import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', UserSchema)
