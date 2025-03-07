import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import Dashboard from "../layout/Dashboard";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/signup",
            element: <Signup></Signup>,
        },
        {
            path: "/login",
            element: <Login></Login>,
        }
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>
    }
  ]);
  