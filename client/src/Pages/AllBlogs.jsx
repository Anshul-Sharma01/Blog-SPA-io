import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import HomeLayout from "../Layouts/HomeLayout.jsx";


function AllBlogs(){
    return(
        <HomeLayout>
            <h1>All Blogs</h1>
        </HomeLayout>
    )
}


export default AllBlogs;
