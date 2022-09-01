import React from 'react'
import { Container } from 'react-bootstrap'
import { HeaderLayout, FooterLayout } from '../'
import { Outlet } from 'react-router-dom'
const AppLayout = () => {
  return (
    <>
      <HeaderLayout />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <FooterLayout />
    </>
  )
}

export default AppLayout
