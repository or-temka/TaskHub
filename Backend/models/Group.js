import mongoose from 'mongoose'

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    cource: {
      type: Number,
      required: true,
    },
    studentsId: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Group', GroupSchema)
