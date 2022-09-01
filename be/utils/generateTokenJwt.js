import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'

const ACCESS_TOKEN_JWT = process.env.ACCESS_TOKEN_JWT
const EXPIRED_TOKEN_JWT = process.env.EXPIRED_TOKEN_JWT
const REFRESH_TOKEN_JWT = process.env.REFRESH_TOKEN_JWT
const EXPIRED_REFRESH_TOKEN_JWT = process.env.EXPIRED_REFRESH_TOKEN_JWT

export const generateAccessToken = (data) => {
  return jwt.sign(data, ACCESS_TOKEN_JWT, {
    expiresIn: EXPIRED_TOKEN_JWT,
  })
}

export const generateRefreshToken = (data) => {
  return jwt.sign(data, REFRESH_TOKEN_JWT, {
    expiresIn: EXPIRED_REFRESH_TOKEN_JWT,
  })
}
