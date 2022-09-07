import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import ProductCard from '../Components/ProductCard'
import api from '../../../services/api'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const ProductsView = () => {
  const [products, setProducts] = useState([])
  const [token, setToken] = useState('')
  const [exp, setExp] = useState('')

  const getProducts = async () => {
    try {
      const { data } = await api.get('/v1/product', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProducts(data.data)
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const refreshToken = async () => {
    try {
      const { data } = await axios.get(
        'http://127.0.0.1:8000/api/auth/refresh-token'
      )
      const accessToken = data.accessToken
      setToken(accessToken)
      const decoded = jwtDecode(accessToken)
      setExp(decoded.exp)
    } catch (error) {
      console.log(error.response)
    }
  }

  const axiosJWT = axios.create()
  axiosJWT.interceptors.request.use(
    async (config) => {
      const now = new Date().getTime()
      if (exp * 1000 < now) {
        const { data } = await axios.get(
          'http://127.0.0.1:8000/api/auth/refresh-token'
        )
        const accessToken = data.accessToken
        config.headers.authorization = `Bearer ${accessToken}`
        setToken(accessToken)
        const decoded = jwtDecode(accessToken)
        setExp(decoded.exp)
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  useEffect(() => {
    refreshToken()
  }, [])
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        <Button type="button" onClick={getProducts} variant="primary">
          Get Data
        </Button>
        {products.map((product, i) => (
          <Col key={i} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ProductsView
