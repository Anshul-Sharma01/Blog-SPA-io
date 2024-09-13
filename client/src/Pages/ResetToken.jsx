import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordToken } from "../Redux/Slices/AuthSlice";

function ResetToken() {
    const { resetToken } = useParams();  // Destructure the token directly from useParams
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userPassword, setUserPassword] = useState("");

    async function handlePasswordUpdation(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append('resetToken',resetToken);
        formData.append('password',userPassword);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    

        const res = await dispatch(resetPasswordToken({ resetToken, password: userPassword }));
        console.log(res);

        navigate("/auth/login");
    }

    return (
        <>
            <section className="flex flex-col justify-center items-center gap-2 h-[100vh]">
                <div className="card card-compact bg-base-100 w-auto shadow-xl flex flex-col justify-center items-center gap-2">
                    <h1 className="text-center text-3xl font-serif tracking-wider">Reset Password</h1>
                    <p>Please enter the new password</p>
                    <form onSubmit={handlePasswordUpdation} noValidate className="flex flex-col justify-center items-center gap-4">
                        <input 
                            type="password"  // Use "password" type instead of "text" for password input
                            name="password" 
                            id="password" 
                            placeholder="Type new password"
                            className="input input-bordered w-full"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-accent px-4 py-2 w-full">
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default ResetToken;