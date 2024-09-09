import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from "../src/Pages/HomePage.jsx"
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/auth/register' element={<Register/>}></Route>
        <Route path='/auth/login' element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App
