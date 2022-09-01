import Product from '../models/Product.js'
import asyncHandler from 'express-async-handler'

/*  
    @desc       fetch all products
    @route      GET /api/v1/product
    @access     public 
*/
export const index = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find()

    res.status(200).json({ message: 'get product success', data: products })
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = 500
    throw err
  }
})

/*  
    @desc       fetch detail product
    @route      GET /api/v1/product/:productId
    @access     public 
*/
export const detail = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.productId
    const product = await Product.findById(productId)
    if (!product) {
      const err = new Error('product not found')
      err.statusCode = 404
      throw err
    }
    res
      .status(200)
      .json({ message: 'get product detail success', data: product })
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = 500
    throw err
  }
})
