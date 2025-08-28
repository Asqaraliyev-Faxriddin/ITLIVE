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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


  
        <BrowserRouter>


        <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/my/profile" element={<Profile />} />
        <Route path="/course" element={<Course/>} /> 

        <Route path="/Login" element={<Login />} /> 
        <Route path="/code" element={<Code />} /> 
        <Route path="/" element={<Home />} /> 
        <Route path="/my" element={<My />} /> 




      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
