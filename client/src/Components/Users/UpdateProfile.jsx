import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserThunk } from "../../Redux/Slices/AuthSlice";

function UpdateProfile() {
    const [userName, setUserName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleUpdateUser(e) {
        e.preventDefault();

        if(userName.trim() === ""){
            toast.error("Please fill in name");
        }

        const res = await dispatch(updateUserThunk({ name : userName }));

        navigate("/me/profile");
        closeModal();
        setUserName("");
        
    }

    function closeModal() {
        document.getElementById('my_modal_3').close();
    }

    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <h1 className="text-center text-xl uppercase tracking-wider font-serif font-bold">Update Name</h1>
                    <form onSubmit={handleUpdateUser} className="flex flex-col gap-2 justify-center items-center">
                        <input 
                            type="text" 
                            placeholder="Enter new name"
                            className="input input-bordered w-full"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button className="btn btn-accent w-full" type="submit">
                            Update Changes
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default UpdateProfile;
