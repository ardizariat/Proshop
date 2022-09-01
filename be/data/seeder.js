import mongoose from 'mongoose'
import dotenv from 'dotenv/config'
import colors from 'colors'
import users from './users.js'
import products from './products.js'
import User from '../app/models/User.js'
import Product from '../app/models/Product.js'
import Order from '../app/models/Order.js'
import connectDB from '../config/db.js'

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createUsers = await User.insertMany(users)
    const adminUser = createUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('data imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`error`.bgRed)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('data destroyed'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`error`.bgRed)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') destroyData()
else importData()
