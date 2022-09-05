import express from 'express'
import {
  login,
  me,
  refreshToken,
  logout,
} from '../app/controllers/authController.js'
import auth from '../app/middleware/authMiddleware.js'

const router = express.Router()

router.get('/me', auth, me)
router.get('/refresh-token', refreshToken)
router.post('/login', login)
router.delete('/logout', auth, logout)

export default router
