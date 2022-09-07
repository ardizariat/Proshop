import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  ProductsView,
  ProductDetail,
  NotFound,
  Cart,
  Login,
  Register,
} from '../../pages'
import { AppLayout } from '../../components'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" exact element={<AppLayout />}>
          <Route path="/" element={<ProductsView />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
