import express from 'express'
import { detail, index } from '../app/controllers/productController.js'
const router = express.Router()
import auth from '../app/middleware/authMiddleware.js'

router.get('/', auth, index)
router.get('/:productId', detail)

export default router
