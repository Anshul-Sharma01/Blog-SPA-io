import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import  { LoginUser }  from "../Redux/Slices/AuthSlice.js";

function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ userData, setUserData ] = useState({
        email : "",
        password : ""
    });

    function handleUserInput(e){
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name] : value
        })
    }

    async function onLogin(event){
        event.preventDefault();
        if(!userData.email || !userData.password){
            toast.error("Please fill in all fields");
            return;
        }

        const response = await dispatch(LoginUser(userData));
        if(response.meta.requestStatus === 'fulfilled'){
            navigate("/");
            
        }
        setUserData({
            email : "",
            password : ""
        });
    }

    


    return(
        <>
            <section className="flex flex-col justify-center h-[100vh] items-center">
                <div className="card card-compact bg-base-100 w-auto shadow-xl glass">
                    <form  onSubmit={onLogin}> 
                        <div className="card-body flex justify-center items-center flex-col gap-6">
                            <h1 className="text-4xl font-serif uppercase tracking-wider">Log In</h1>
                            <div className="flex justify-center items-center flex-col">
                                <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                                    <div className=" flex flex-col text-left">
                                        <label className="text-xl uppercase font-serif" htmlFor="emailInput">
                                            Email
                                        </label>
                                        <input 
                                            type="email"
                                            placeholder="user@example.com"
                                            id="emailInput"
                                            name="email"
                                            onChange={handleUserInput}
                                            value={userData.email}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className=" flex flex-col text-left">
                                        <label className="text-xl uppercase font-serif" htmlFor="passwordInput">
                                            Password
                                        </label>
                                        <input 
                                            type="password"
                                            placeholder="user@123#$*"
                                            id="passwordInput"
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
                        Don't have an account ?  <Link to="/auth/register" className="link text-accent cursor-pointer">Create an Account</Link>
                    </p>
                </div>

            </section>
        </>
    )
}

export default Login;

