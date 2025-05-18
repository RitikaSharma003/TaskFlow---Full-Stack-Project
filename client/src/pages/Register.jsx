import React from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const Change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  console.log(Values);

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/v1/register`,
        Values
      );

      alert(res.data.success);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-blue-300/20">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-800">
          TaskFlow
        </h1>
        <h3 className="text-center font-semibold text-xinc-900-">
          Register with TaskFlow
        </h3>
      </div>
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
        <form className="flex flex-col gap-4" action="">
          <input
            type="text"
            required
            placeholder="username"
            className="border rounded px-4 py-1 border-zinc-400-w-[100%] outline-none "
            name="username"
            value={Values.username}
            onChange={Change}
          />
          <input
            type="email"
            required
            placeholder="email"
            className="border rounded px-4 py-1 border-zinc-400-w-[100%] outline-none"
            name="email"
            value={Values.email}
            onChange={Change}
          />
          <input
            type="password"
            required
            placeholder="password"
            className="border rounded px-4 py-1 border-zinc-400-w-[100%] outline-none"
            name="password"
            value={Values.password}
            onChange={Change}
          />
          <button
            onClick={register}
            className="bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300"
          >
            Register
          </button>
          <p className="text-center font-semibold text-gray-900">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
