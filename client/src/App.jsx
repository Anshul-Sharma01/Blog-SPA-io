
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from "../src/Pages/HomePage.jsx"
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import Profile from './Pages/Profile.jsx'
import CreateBlog from './Pages/CreateBlog.jsx'
import PersonalBlogs from './Pages/PersonalBlogs.jsx'
import NotFound from './Components/NotFound.jsx'
import RequireAuth from './Components/RequireAuth.jsx'
import PermissionDenied from './Components/PermissionDenied.jsx'
import ResetPassword from './Pages/ResetPassword.jsx'
import ResetToken from './Pages/ResetToken.jsx'
import ChangePassword from './Pages/ChangePassword.jsx'
import AllBlogs from './Pages/AllBlogs.jsx'
import ViewBlog from './Pages/ViewBlog.jsx'
import MyFavourites from './Pages/MyFavourites.jsx'
import AdminPage from './Pages/AdminPage.jsx'
import AuthorProfile from './Pages/AuthorProfile.jsx'
import SearchBlogs from './Components/Blogs/SearchBlogs.jsx'


function App() {

  return (
    <>
      <Routes>
        {/* HOME*/}
        <Route path='/' element={<HomePage/>} ></Route>

        {/* AUTH ROUTES */}
        <Route path='/auth/register' element={<Register/>}></Route>
        <Route path='/auth/login' element={<Login/>}></Route>
        <Route path='/auth/reset' element={<ResetPassword/>}></Route>
        <Route path='/auth/reset/:resetToken' element={<ResetToken/>}></Route>
        <Route path='/auth/password/change' element={<ChangePassword/>}></Route>
        <Route path='/component/check' element={<SearchBlogs/>}></Route>


        <Route path='/blogs/view/:blogId' element={<ViewBlog/>}></Route>
        <Route path='/view/author-profile/:authorId' element={<AuthorProfile/>}></Route>

        <Route path='/blogs/all' element={<AllBlogs/>}></Route>
        <Route element={<RequireAuth allowedRoles={['USER','ADMIN']} />}>
          <Route path='/me/profile' element={<Profile/>}></Route>
          <Route path='/blogs/create' element={<CreateBlog/>}></Route>
          <Route path='/blogs/me' element={<PersonalBlogs/>}></Route>

          <Route path='/favourites/my' element={<MyFavourites/>}></Route>
        </Route>



        <Route path='/denied' element={<PermissionDenied/>}></Route>
        <Route element={<RequireAuth allowedRoles={['USER','ADMIN']} />}>
          <Route path='/admin/dashboard' element={<AdminPage />} />
        </Route>
G
        {/* NOT FOUND */}

        <Route path='*' element={<NotFound/>}></Route>


      </Routes>
        

    </>
  )
}

export default App
