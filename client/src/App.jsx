import React from 'react'
import {Route,Routes,useNavigate,useLocation} from "react-router-dom"
import Login from './pages/Login'
import Register from "./pages/Register"
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
const App = () => {

  const navigate=useNavigate();
  const location = useLocation();
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn && location.pathname !== "/dashboard") {
      navigate("/dashboard");
    } else if (!userLoggedIn && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [navigate, location.pathname]);



// const App = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const userLoggedIn = localStorage.getItem("userLoggedIn");

//     if (!userLoggedIn && location.pathname === "/dashboard") {
//       navigate("/login");
//     }
    
//     else if (userLoggedIn && (location.pathname === "/login" || location.pathname === "/register")) {
//       navigate("/dashboard");
//     }
    
//     else if (userLoggedIn && location.pathname === "/dashboard") {
//       localStorage.removeItem("userLoggedIn");
//       navigate("/login");
//     }
    
//     else if (!userLoggedIn && location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/dashboard") {
//       navigate("/login");
//     }
   

//   }, [navigate, location.pathname]);
  
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
