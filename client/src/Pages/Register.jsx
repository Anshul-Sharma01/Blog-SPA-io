import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";


function Register(){

    const [ avatarUrl, setAvatarUrl ] = useState();

    function handleAvatarUpload(e){
        const file = e.target.files[0];
        if(file){
            const previewUrl = URL.createObjectURL(file);
            setAvatarUrl(previewUrl);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <>
            <section className="flex flex-col justify-center h-[100vh] items-center">

                <div className="card card-compact bg-base-100 w-auto shadow-xl glass">
                    <form onSubmit={handleSubmit}>
                        <div className="card-body flex justify-center items-center flex-col gap-6">
                            <h1 className="text-4xl font-serif uppercase tracking-wider">Sign Up</h1>
                            <div className="text-5xl rounded-full p-1 ">
                                <label htmlFor="imgUpload" className=" cursor-pointer">
                                    {
                                        !avatarUrl && (
                                            <FaRegUser className="w-20 h-20"/>
                                        )
                                    }{
                                        avatarUrl && (
                                            <img className="w-20 h-20 rounded-full object-cover"  src={avatarUrl} />
                                        )
                                    }

                                </label>
                                <input type="file" onChange={handleAvatarUpload} id="imgUpload"  hidden/> 
                            </div>
                            <div className="flex justify-center items-center flex-col">
                                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                                    <div className="flex flex-col text-left">
                                        <label htmlFor="unameInput" className="text-xl uppercase font-serif r">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="example@01"
                                            id="unameInput"
                                            name="username"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left ">
                                        <label htmlFor="nameInput" className="text-xl uppercase font-serif r">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="nameInput"
                                            placeholder="John doe"
                                            name="name"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left ">
                                        <label htmlFor="emailInput" className="text-xl uppercase font-serif r">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="emailInput"
                                            placeholder="example@blog.com"
                                            name="email"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left ">
                                        <label htmlFor="passwordInput" className="text-xl uppercase font-serif r">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="passwordInput"
                                            placeholder="123@#$abc*"
                                            name="password"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                </div>

                            </div>
                            <button onClick={handleSubmit} type="submit"
                            className="btn btn-accent w-full text-lg">
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
    )
}

export default Register;

