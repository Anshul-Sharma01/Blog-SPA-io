import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { Link, useNavigate } from "react-router-dom";



function Profile(){

    const userData = useSelector((state) => state.auth.userData); 
    const navigate = useNavigate();
    // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    // console.log(userData, isLoggedIn);

    const [ userProfileData, setUserProfileData ] = useState({
        avatar : "",
        name : "",
        username : "",
        email : ""
    })

    

    useEffect(() => {
        toast.loading("Fetching your Profile...");
        async function setData(){
            try {
                setUserProfileData({
                    avatar : userData.avatar.secure_url || " ",
                    name : userData.name || " ",
                    username : userData.username || " ",
                    email : userData.email || " "
                })
                toast.dismiss();
                toast.success("Profile Successfully Fetched");
            } catch (error) {
                toast.dismiss();
                toast.error("Profile Successfully Fetched");
                console.error("Error fetching Profile : ", error);
            }
        }
        if(userData){
            setData();
        }
        // console.log(userProfileData);
    }, [userData]);

    return(
        <HomeLayout>
            <section className="flex justify-center items-center h-[100vh]">
            
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure>
                        <img
                        className="rounded-full border-2 border-solid border-black h-[400px]"
                        src={userProfileData.avatar}
                        alt="USer-Picture" />
                    </figure>
                    <div className="card-body">
                        <div className="flex justify-center items-center flex-col">
                            <div className="flex flex-col justify-center items-center gap-4 p-4" >
                                <div className="flex flex-col  text-left">
                                    <label htmlFor="inputname" className="block text-gray-800 font-mono tracking-widest text-lg font-semibold">Username</label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        disabled
                                        value={userProfileData.username}
                                        name="inputname"
                                        className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col  text-left">
                                    <label htmlFor="inputname" className="block text-gray-800 font-mono tracking-widest text-lg font-semibold">Name</label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        name="inputname"
                                        value={userProfileData.name}
                                        disabled
                                        className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col  text-left">
                                    <label htmlFor="inputname" className="block text-gray-800 font-mono tracking-widest text-lg font-semibold">Email</label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        name="inputname"
                                        disabled
                                        value={userProfileData.email}
                                        className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-accent" onClick={(e) => navigate("/")}>
                                <FaArrowLeftLong />
                                Go Back
                            </button>
                            <button className="btn text-white btn-primary">Update Profile</button>
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    )
}

export default Profile;


