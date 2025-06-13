import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import Dashboard from "../layout/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";

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
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: '/dashboard',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'profile',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'all-users',
          element: <AllUsers></AllUsers>
        },
        {
          path: 'profile',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'profile',
          element: <MyProfile></MyProfile>
        },

        
      ]
    }
  ]);
  