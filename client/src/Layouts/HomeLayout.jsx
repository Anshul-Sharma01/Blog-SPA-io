import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../Redux/Slices/AuthSlice.js";
import { useEffect, useState } from "react";
import ThemeController from "../Components/ThemeController.jsx";

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch state directly from Redux
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const userRole = useSelector((state) => state?.auth?.userRole);
    const personalBlogsExists = useSelector((state) => state?.auth?.personalBlogsExists);

    // Drawer control functions
    function changeWidth() {
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 0;
    }


    async function handleLogout(e) {
        e.preventDefault();
        const res = await dispatch(Logout());
        if (res?.payload?.success) {
            navigate("/");
        }
    }
    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input type="checkbox" id="my-drawer" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            size={"32px"}
                            className="font-bold text-black ml-4"
                            onClick={changeWidth}
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative h-fit">
                        <li className="w-fit absolute right-2 z-50 ">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li className="mt-10">
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/blogs/all">All Blogs</Link>
                        </li>

                        {!isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/auth/register">Sign Up</Link>
                                </li>
                                <li>
                                    <Link to="/auth/login">Log In</Link>
                                </li>
                            </>
                        )}
                        {
                            userRole === "ADMIN" && (
                                <li>
                                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                                </li>
                            )
                        }

                        {isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/me/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/blogs/create">Create Blog</Link>
                                </li>
                                
                                <li>
                                    <Link to="/blogs/me">My Blogs</Link>
                                </li>
                                
                                <li>
                                    <Link to="/favourites/my"> My Favourites</Link>
                                </li>
                                <li>
                                    <Link to="/auth/password/change">Change Password</Link>
                                </li>
                                <li>
                                    <Link onClick={handleLogout}>LogOut</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <ThemeController className="btn btn-ghost"/>
                        </li>
                    </ul>
                </div>
            </div>

            {children}
        </div>
    );
}

export default HomeLayout;
