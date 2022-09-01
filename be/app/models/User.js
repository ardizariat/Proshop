import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async (password) => {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
