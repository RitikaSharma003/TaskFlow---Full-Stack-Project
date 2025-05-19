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

    // Agar user logged in nahi hai aur dashboard par jaane ki koshish kar raha hai, toh login par redirect karo
    if (!userLoggedIn && location.pathname === "/dashboard") {
      navigate("/login");
    }
    // Agar user logged in hai aur login/register page par hai, to dashboard par redirect karo
    else if (userLoggedIn && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/dashboard");
    }
     // Agar user logged in nahi hai aur current location login ya register nahi hai to login par redirect
    else if (!userLoggedIn && location.pathname !== "/login" && location.pathname !== "/register")
    {
       navigate("/login");
    }
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