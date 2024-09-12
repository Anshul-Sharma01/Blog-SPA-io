
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from "../src/Pages/HomePage.jsx"
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import Profile from './Pages/Profile.jsx'
import CreateBlog from './Pages/CreateBlog.jsx'
import PersonalBlogs from './Pages/PersonalBlogs.jsx'
import NotFound from './Components/NotFound.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/auth/register' element={<Register/>}></Route>
        <Route path='/auth/login' element={<Login/>}></Route>

        <Route path='/me/profile' element={<Profile/>}></Route>

        <Route path='/blogs/create' element={<CreateBlog/>}></Route>
        <Route path='/blogs/me' element={<PersonalBlogs/>}></Route>

        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
