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

        if (userName.trim() === "") {
            toast.error("Please fill in name");
            return; 
        }

        const res = await dispatch(updateUserThunk({ name: userName }));
        closeModal();
        setUserName("");

        navigate("/me/profile");
    }

    function closeModal() {
        document.getElementById('my_modal_3').close();
    }

    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-6">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <h1 className="text-center text-xl font-serif font-bold text-gray-800 uppercase tracking-wider py-4">Update Name</h1>
                    <form onSubmit={handleUpdateUser} className="flex flex-col gap-4 justify-center items-center">
                        <input 
                            type="text" 
                            placeholder="Enter new name"
                            className="input input-bordered w-full p-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button className="btn btn-accent w-full p-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200" type="submit">
                            Update Changes
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default UpdateProfile;
