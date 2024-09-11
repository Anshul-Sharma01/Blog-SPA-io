import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { isEmail, isPassword } from "../Helpers/regexMatcher.js";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Slices/AuthSlice.js";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [avatarUrl, setAvatarUrl] = useState();
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handleAvatarUpload(event) {
        event.preventDefault();
        // getting the image
        const uploadedImage = event.target.files[0];

        if(uploadedImage) {
            setUserData({
                ...userData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setAvatarUrl(this.result);
            })
        }
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        // Validate form inputs
        if (!userData.email || !userData.name || !userData.username || !userData.password) {
            toast.error("Please fill in all the details");
            return;
        }
    
        if (userData.username.length < 5) {
            toast.error("Username should be at least 5 characters long");
            return;
        }
    
        if (!isEmail(userData.email)) {
            toast.error("Invalid Email ID");
            return;
        }
    
        if (!isPassword(userData.password)) {
            toast.error("Password should be at least 8 characters long with at least a number and special character");
            return;
        }
    
        // Prepare form data
        const formData = new FormData();
        formData.append("username", userData.username);
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("avatar", userData.avatar);
    
        const response = await dispatch(createAccount(formData));
    
        if (response.payload.statusCode === 200) {
            navigate("/");
            setUserData({
                username: "",
                name: "",
                password: "",
                avatar: ""
            });
            setAvatarUrl("");
        }
    }

    return (
        <>
            <section className="flex flex-col justify-center h-[100vh] items-center">
                <div className="card card-compact bg-base-100 w-auto shadow-xl glass">
                    <form onSubmit={handleSubmit}>
                        <div className="card-body flex justify-center items-center flex-col gap-6">
                            <h1 className="text-4xl font-serif uppercase tracking-wider">Sign Up</h1>
                            <div className="text-5xl rounded-full p-1">
                                <label htmlFor="imgUpload" className="cursor-pointer">
                                    {
                                        !avatarUrl ? (
                                            <FaRegUser className="w-20 h-20" />
                                        ) : (
                                            <img className="w-20 h-20 rounded-full object-cover" src={avatarUrl} />
                                        )
                                    }
                                </label>
                                <input name="avatar" type="file" onChange={handleAvatarUpload} id="imgUpload" hidden />
                            </div>
                            <div className="flex justify-center items-center flex-col">
                                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                                    <div className="flex flex-col text-left">
                                        <label htmlFor="unameInput" className="text-xl uppercase font-serif">Username</label>
                                        <input
                                            type="text"
                                            placeholder="example@01"
                                            id="unameInput"
                                            name="username"
                                            onChange={handleUserInput}
                                            value={userData.username}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <label htmlFor="nameInput" className="text-xl uppercase font-serif">Name</label>
                                        <input
                                            type="text"
                                            id="nameInput"
                                            placeholder="John doe"
                                            name="name"
                                            onChange={handleUserInput}
                                            value={userData.name}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <label htmlFor="emailInput" className="text-xl uppercase font-serif">Email</label>
                                        <input
                                            type="email"
                                            id="emailInput"
                                            placeholder="example@blog.com"
                                            name="email"
                                            onChange={handleUserInput}
                                            value={userData.email}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <label htmlFor="passwordInput" className="text-xl uppercase font-serif">Password</label>
                                        <input
                                            type="password"
                                            id="passwordInput"
                                            placeholder="123@#$abc*"
                                            name="password"
                                            onChange={handleUserInput}
                                            value={userData.password}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-accent w-full text-lg">
                                Submit
                            </button>
                        </div>
                    </form>
                    <p>
                        Already have an account? <Link to="/auth/login" className='link text-accent cursor-pointer'> Login</Link>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Register;
