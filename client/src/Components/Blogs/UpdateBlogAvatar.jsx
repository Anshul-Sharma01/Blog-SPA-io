import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBlogThumbnailThunk } from "../../Redux/Slices/BlogSlice";

function UpdateBlogAvatar({ blogId }) {
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
        formData.append('thumbnail', avatar);
        const res = await dispatch(updateBlogThumbnailThunk({ formData, blogId }));

        if (res.payload) {
            closeModal();
            navigate("/blogs/me");
        }

        setAvatarUrl("");
        setAvatar("");
    }

    function closeModal() {
        document.getElementById('blog_avatar_modal').close();
    }

    return (
        <>
            <dialog id="blog_avatar_modal" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-6">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
                        Update Blog Avatar
                    </h1>
                    <form onSubmit={handleUpdateAvatar} className="flex flex-col gap-4 items-center">
                        <label htmlFor="avatarUpload" className="flex flex-col items-center cursor-pointer">
                            {avatarUrl ? (
                                <img src={avatarUrl} className="w-32 h-32 rounded-full border-2 border-blue-400" alt="Avatar" />
                            ) : (
                                <MdOutlineCloudUpload className="text-8xl text-gray-400" />
                            )}
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

export default UpdateBlogAvatar;
