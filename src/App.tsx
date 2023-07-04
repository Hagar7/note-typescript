import React from 'react';
// import {  RouterProvider,Routes,createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout/Layout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
// import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
// import { BrowserRouter as Router,Route, Routes, BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {

  const routes = createBrowserRouter([
    {path:'/',element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:'/login',element:<Login/>},
      {path:'/register',element:<Register/>},
    ]},
  ])



  return (
   <RouterProvider router={routes}/>
  // <BrowserRouter>
  //   <Routes>
  //   <Route path="/" element={<Layout />}>
  //           <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />
  //           <Route path="/login" element={<Login />} />
  //           <Route path="/register" element={<Register />} />
  //         </Route>
  //   </Routes>
  // </BrowserRouter>
   
  );
}

export default App;
