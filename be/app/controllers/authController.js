import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import {
  generateAccessToken,
  generateRefreshToken,
  REFRESH_TOKEN_JWT,
} from '../../utils/generateTokenJwt.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as moment from '../../utils/moment.js'

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
      const accessToken = generateAccessToken({ userId: user._id })
      const refreshToken = generateRefreshToken({ userId: user._id })

      user.refreshToken = refreshToken
      user.lastLogin = new Date()

      user.save()

      const data = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        lastLogin: moment.tanggalJamFormatIndonesia(user.lastLogin),
        isAdmin: user.isAdmin,
      }

      res.cookie('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      })
      res.status(200).json({
        message: 'login success',
        data,
        accessToken,
      })
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
    @desc       refresh token
    @route      GET /api/auth/refresh-token
    @access     private 
*/
export const refreshToken = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.refreshToken

    if (token && token !== '') {
      const user = await User.findOne({ refreshToken: token })
      if (!user) {
        const err = new Error('unauthorized')
        err.statusCode = 401
        throw err
      }

      const data = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        lastLogin: user.lastLogin,
        isAdmin: user.isAdmin,
      }

      jwt.verify(token, REFRESH_TOKEN_JWT, (err, decode) => {
        if (err) {
          const error = new Error(error)
          error.statusCode = 403
          throw error
        }
        const accessToken = generateAccessToken({ userId: decode.userId })
        res.status(200).json({ data, accessToken })
      })
    }
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = 401
    throw err
  }
})

/*  
    @desc       fetch who is login
    @route      GET /api/auth/me
    @access     private 
*/
export const me = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      '-password -refreshToken -isAdmin'
    )
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

/*  
    @desc       destroy token
    @route      GET /api/auth/logout
    @access     private 
*/
export const logout = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    let token = req.headers.authorization
    if (token.startsWith('Bearer') && token.split(' ')[1] != '') {
      token = ''
    }
    if (!user) {
      const err = new Error('unauthorized')
      err.statusCode = 401
      throw err
    }

    res.clearCookie('refreshToken')

    user.refreshToken = null
    user.lastLogin = new Date()
    user.save()

    res.status(200).json({ message: 'user logout' })
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = 401
    throw err
  }
})
