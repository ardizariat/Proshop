import express from 'express'
import { detail, index } from '../app/controllers/productController.js'
const router = express.Router()

router.get('/', index)
router.get('/:productId', detail)

export default router
