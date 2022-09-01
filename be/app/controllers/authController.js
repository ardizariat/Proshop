import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/generateTokenJwt.js'
import bcrypt from 'bcryptjs'

/*  
    @desc       fetch login
    @route      POST /api/auth/login
    @access     public 
*/
export const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
      const data = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      }
      const accessToken = generateAccessToken(data)
      const refreshToken = generateRefreshToken(data)
      await User.updateOne(
        { refreshToken },
        { refreshToken: refreshToken, lastLogin: new Date() }
      )
      res.cookie('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      })
      res.status(200).json({ message: 'login success', data, accessToken })
    }
    const err = new Error('Unauthorized')
    err.statusCode = 401
    throw err
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = 400
    throw err
  }
})

/*  
    @desc       fetch who is login
    @route      GET /api/auth/me
    @access     private 
*/
export const me = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  try {
    const user = await User.findOne({ refreshToken })
    if (!user) {
      const err = new Error('unauthorized')
      err.statusCode = 401
      throw err
    }
    res.status(200).json({ user })
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = 401
    throw err
  }
})
