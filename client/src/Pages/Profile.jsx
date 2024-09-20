import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import UpdateProfile from "../Components/Users/UpdateProfile.jsx"; 
import UpdateAvatar from "../Components/Users/UpdateAvatar.jsx";

function Profile() {
    const userData = useSelector((state) => state?.auth?.userData);
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const [userProfileData, setUserProfileData] = useState({
        avatar: "",
        name: "",
        username: "",
        email: ""
    });

    useEffect(() => {
        toast.loading("Fetching your Profile...");
        async function setData() {
            try {
                setUserProfileData({
                    avatar: userData?.avatar?.secure_url || "",
                    name: userData?.name || "",
                    username: userData?.username || "",
                    email: userData?.email || ""
                });
                toast.dismiss();
                toast.success("Profile Successfully Fetched");
            } catch (error) {
                toast.dismiss();
                toast.error("Error fetching Profile");
                console.error("Error fetching Profile: ", error);
            }
        }
        if (userData) {
            setData();
        }
    }, [userData]);

    return (
        <HomeLayout>
            <section className="flex justify-center items-center h-[100vh]">
                <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <figure className="flex justify-center p-6">
                        <img
                            className="rounded-full border-4 border-gray-200 h-[150px] w-[150px] object-cover shadow-sm"
                            src={userProfileData.avatar}
                            alt="User-Picture"
                        />
                    </figure>
                    <div className="px-6 py-4">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800">{userProfileData.name}</h2>
                            <p className="text-gray-500 text-sm">@{userProfileData.username}</p>
                            <p className="text-gray-600 mt-2">{userProfileData.email}</p>
                        </div>
                        <div className="mt-6">
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300"
                                    onClick={() => document.getElementById('my_modal_1').showModal()}
                                >
                                    Update Avatar
                                </button>
                                <button
                                    className="w-full py-2 px-4 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition duration-300"
                                    onClick={() => document.getElementById('my_modal_3').showModal()}
                                >
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <UpdateProfile /> {/* Render the UpdateProfile component */}
            <UpdateAvatar />
        </HomeLayout>
    );
}

export default Profile;