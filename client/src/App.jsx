import React from 'react'
import {Route,Routes,useNavigate,useLocation} from "react-router-dom"
import Login from './pages/Login'
import Register from "./pages/Register"
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
// const App = () => {

//   const navigate=useNavigate();
//   const location = useLocation();
//   useEffect(() => {
//     const userLoggedIn = localStorage.getItem("userLoggedIn");
//     if (userLoggedIn && location.pathname !== "/dashboard") {
//       navigate("/dashboard");
//     } else if (!userLoggedIn && location.pathname !== "/login" && location.pathname !== "/register") {
//       navigate("/login");
//     }
//   }, [navigate, location.pathname]);

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // If user is NOT logged in and trying to access dashboard, redirect to login
    if (!userLoggedIn && location.pathname === "/dashboard") {
      navigate("/login");
    }
    // If user IS logged in and on login or register page, redirect to dashboard
    else if (userLoggedIn && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/dashboard");
    }
    // If user IS logged in and on dashboard, log out and redirect to login
    else if (userLoggedIn && location.pathname === "/dashboard") {
      localStorage.removeItem("userLoggedIn");
      navigate("/login");
    }
    // If user is NOT logged in and on any other page besides login or register, redirect to login
    else if (!userLoggedIn && location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/dashboard") {
      navigate("/login");
    }
    // Otherwise, allow navigation (e.g., logged-in user on dashboard, or non-logged-in user on login/register)

  }, [navigate, location.pathname]);
  
   return (

    
  <>
  <Routes>

    <Route  path="/register"  element={<Register/>} />
 <Route  path="/login"  element={<Login/>} />
  <Route  path="/dashboard"  element={<Dashboard/>} />
   <Route path="/" element={<Login />} />
  </Routes>
  
  
  </>
  )
}

export default App