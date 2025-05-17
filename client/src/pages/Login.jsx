import React from 'react'
import {Link,BrowserRouter as Router, Route, Routes,useNavigate} from "react-router-dom";
import { useState } from 'react';
import axios from "axios";

const Login = () => {
  const navigate=useNavigate();
  
      const [Values,setValues]=useState({
  
      email:"",
      password:"",
  });
  const Change=(e)=>{
      const {name,value}=e.target;
  setValues({...Values,[name]:value})
  };
  
  console.log(Values);
  
  const login=async(e)=>{
      e.preventDefault();
  
      try{
const res= await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/v1/login`,Values,{
withCredentials:true
}
  );

  

 localStorage.setItem("userLoggedIn","yes");
 navigate("/dashboard");
 


  
  
      }
      catch(error)
      {
          
  
         alert(error.response.data.error);
  
      }
  };
  
  
  return (
 <div className="flex h-screen flex-col items-center justify-center bg-blue-300/20">
        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
<h1 className='text-3xl font-bold text-center mb-1 text-blue-800'>TaskFlow</h1>
<h3 className="text-center font-semibold text-xinc-900-">Login with TaskFlow</h3>
        </div>
        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
            <form className="flex flex-col gap-4"  method="POST" action="">


<input type="email" required placeholder="email"className="border rounded px-4 py-1 border-zinc-400-w-[100%] outline-none" name="email" value={Values.email}  onChange={Change}/>
<input type="password" required placeholder="password"className="border rounded px-4 py-1 border-zinc-400-w-[100%] outline-none" name="password" value={Values.password}  onChange={Change}/>
<button className="bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300" onClick={login}>Login</button>
<p className="text-center font-semibold text-gray-900">
    Don't have an account? <Link to="/register">SignUp</Link>
</p>
            </form>

        </div>
    </div>
  )
}

export default Login