export const errorHandler = (error, req, res, next) => {
  const NODE_ENV = process.env.NODE_ENV || 'development'

  const statusCode = error.statusCode || 500
  const message = error.message
  const data = error.data
  const stack = error.stack
  if (NODE_ENV === 'production') res.status(statusCode).json({ message, data })
  res.status(statusCode).json({ message, data, stack })
}

export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}
