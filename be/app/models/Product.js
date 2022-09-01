import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: Number, default: 0 },
  comment: { type: String, default: 0 },
})

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)
const Product = mongoose.model('Product', productSchema)

export default Product
