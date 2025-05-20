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


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // If user IS logged in, immediately navigate to dashboard if on login or register
    if (userLoggedIn && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/dashboard");
    }
    // If user IS logged in and on dashboard, log out and go to login
    else if (userLoggedIn && location.pathname === "/dashboard") {
      localStorage.removeItem("userLoggedIn");
      navigate("/login");
    }
    // If user is NOT logged in and trying to access dashboard or other protected pages, go to login
    else if (!userLoggedIn && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");
    }
    // If user is NOT logged in and on dashboard, go to login
    else if (!userLoggedIn && location.pathname === "/dashboard") {
      navigate("/login");
    }
    // Otherwise, stay on the current page (login or register if not logged in)

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