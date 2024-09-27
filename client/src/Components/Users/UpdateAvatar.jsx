import { useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa"; 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserAvatarThunk } from "../../Redux/Slices/AuthSlice";

function UpdateAvatar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [avatarUrl, setAvatarUrl] = useState();
    const [avatar, setAvatar] = useState();

    function handleAvatarUpload(event) {
        event.preventDefault();

        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setAvatar(uploadedImage);

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setAvatarUrl(this.result);
            });
        }
    }

    async function handleUpdateAvatar(e) {
        e.preventDefault();

        if (!avatar) {
            toast.error("Please upload avatar");
            return; 
        }

        const formData = new FormData();
        formData.append('avatar', avatar);
        await dispatch(updateUserAvatarThunk(formData));

        closeModal();
        navigate("/me/profile");
        
        setAvatarUrl("");
        setAvatar("");
    }

    function closeModal() {
        document.getElementById('my_modal_1').close();
    }

    return (
        <>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-6">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <h1 className="text-center text-xl font-serif font-bold text-gray-800 uppercase tracking-wider py-4">Update Avatar</h1>
                    <form onSubmit={handleUpdateAvatar} className="flex flex-col gap-4 justify-center items-center">
                        <label htmlFor="avatarUpload" className="flex flex-col items-center cursor-pointer">
                            {
                                avatarUrl ? (
                                    <img src={avatarUrl} className="w-40 h-40 rounded-full border-2 border-gray-300" alt="Avatar" />
                                ) : (
                                    <FaCloudUploadAlt className="text-6xl text-gray-400 hover:text-gray-600 transition duration-200" />
                                )
                            }
                        </label>
                        <input 
                            type="file" 
                            id="avatarUpload"
                            name="avatar"
                            hidden
                            onChange={handleAvatarUpload}
                        />
                        <button className="btn btn-accent w-full p-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200" type="submit">
                            Update Avatar
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default UpdateAvatar;
