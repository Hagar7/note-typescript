import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'

const Layout = () => {
  return (
    <>
    <Navbar/>
   <Outlet></Outlet>
    </>
  )
}

export default Layout
