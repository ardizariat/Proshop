import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { ACCESS_TOKEN_JWT } from '../../utils/generateTokenJwt.js'
import asyncHandler from 'express-async-handler'

const auth = asyncHandler(async (req, res, next) => {
  let token

  const authorization = req.headers.authorization
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1]
    const decode = jwt.verify(token, ACCESS_TOKEN_JWT)
    const user = await User.findById(decode.userId).select('-password -idAdmin')
    if (!user) {
      const err = new Error('user not found')
      err.statusCode = 404
      throw err
    }
    req.user = user
    next()
  }
  if (!token) {
    let err = new Error('unauthorized')
    err.statusCode = 401
    throw err
  }
})

export default auth
