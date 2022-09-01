import express from 'express'
import { login, me } from '../app/controllers/authController.js'

const router = express.Router()

router.get('/me', me)
router.post('/login', login)

export default router
