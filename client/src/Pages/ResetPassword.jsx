import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetUserPassword } from "../Redux/Slices/AuthSlice";

function ResetPassword(){

    const dispatch = useDispatch();

    const [ userEmail, setUserEmail ] = useState('');

    async function handleFormSubmit(e){
        e.preventDefault();

        if(userEmail.trim() === ''){
            toast.error("Please fill in your email");
        }

        const response = await dispatch(resetUserPassword({email : userEmail}));
        console.log("Response: ",response);

    }

    return(
        <>
            <section className="flex flex-col justify-center items-center h-[100vh]">
                <div className="card card-compact bg-base-100  shadow-xl gap-3 w-[400px]">
                    <h1 className="text-center text-3xl font-serif tracking-wider">Forgot Password</h1>
                    <p className="w-full font-serif text-md tracking-wide">Enter your email we'll send you a link to reset your account password</p>
                    <form noValidate onSubmit={handleFormSubmit} className="flex flex-col justify-center items-center gap-3">
                        <input 
                        type="email" 
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Enter your email" 
                        className="input input-bordered w-full " 
                        />
                        <button className="btn w-full btn-accent ">
                            Send Link
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}


export default ResetPassword;