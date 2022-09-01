import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductsView, ProductDetail, NotFound, Cart } from "../../pages";
import { AppLayout } from "../../components";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<AppLayout />}>
          <Route path="/" element={<ProductsView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart/:productId" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
