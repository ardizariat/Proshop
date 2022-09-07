import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 3000,
})

// api.interceptors.request.use(
//   async (config) => {
//     console.log(config)
//   },
//   (err) => Promise.reject(err)
// )

export default api
