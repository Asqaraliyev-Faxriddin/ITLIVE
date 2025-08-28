import { useState } from 'react'
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Register from './register'
import Login from './Login'
import Home from './home'
import Code from './code'
import Profile from './profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Course from './course';
import My from './My';
import Contact from './contact';
import ResetPassword from './reset.password';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


  
        <BrowserRouter>


        <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/my/profile" element={<Profile />} />
        <Route path="/course" element={<Course/>} /> 

        <Route path="/login" element={<Login />} /> 
        <Route path="/code" element={<Code />} /> 
        <Route path="/" element={<Home />} /> 
        <Route path="/my" element={<My />} /> 
        <Route path="/boglanish" element={<Contact />} /> 
        <Route path="/reset_password" element={<ResetPassword />} /> 






      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
