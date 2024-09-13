import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePasswordThunk } from "../Redux/Slices/AuthSlice";
import HomeLayout from "../Layouts/HomeLayout";


function ChangePassword(){

    const [ oldPassword, setOldPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handlePasswordChange(e) {
        e.preventDefault();

        if(!oldPassword || !newPassword){
            toast.error("All fields are mandatory");
        }

        const response = await dispatch(changePasswordThunk({ oldPassword, newPassword }));

        console.log(response);

        setOldPassword("");
        setNewPassword("");

        navigate("/");
    }


    return(
        <HomeLayout>
            <section className="flex flex-col justify-center items-center h-[100vh]">
                <div className="card card-compact bg-base-100 w-auto shadow-xl glass gap-3">
                    <h1 className="text-4xl font-serif uppercase p-4 tracking-widest">Change Password</h1>
                    <form noValidate onSubmit={handlePasswordChange} className="flex flex-col justify-center items-center gap-2 p-4">

                        <input 
                            type="password"
                            placeholder="Enter old Password"
                            className="input input-bordered w-full"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />

                        <input 
                            type="password"
                            placeholder="Enter new Password"
                            className="input input-bordered w-full"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <button className="btn btn-accent w-full">
                            Change Password
                        </button>

                    </form>
                </div>
            </section>
        </HomeLayout>
    )
}


export default ChangePassword;