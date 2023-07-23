import React from "react";
import Home from "./Pages/Home/Home";
import Layout from "./Pages/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Quotes from "./Pages/Quotes/Quotes";
import Contact from "./Pages/Contact/Contact";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NotFound from "./NotFound/NotFound";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/quotes",
          element: (
            <ProtectedRoute>
              <Quotes />
            </ProtectedRoute>
          ),
        },
        {
          path: "/contact",
          element: (
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
