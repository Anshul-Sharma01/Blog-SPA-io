import { useState } from "react";
import { MdOutlineWallpaper } from "react-icons/md";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewBlog } from "../Redux/Slices/BlogSlice.js";
import toast from "react-hot-toast";

function CreateBlog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        thumbnail: "",
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setBlogData({
            ...blogData,
            [name]: value,
        });
    }

    function getThumbnail(e) {
        e.preventDefault();

        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            setBlogData({
                ...blogData,
                thumbnail: uploadedImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setThumbnailUrl(this.result);
            });
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        if(!blogData.title || !blogData.content || !blogData.thumbnail){
            toast.error("all fields are mandatory");
            return;
        }
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("content", blogData.content);
        formData.append("thumbnail", blogData.thumbnail);

        const res = await dispatch(createNewBlog(formData));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/blogs/me");
        }
    }

    return (
        <HomeLayout>
            <section className="flex flex-row justify-center items-center h-[100vh] ">
                <form
                    onSubmit={handleFormSubmit}
                    className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
                >
                    <div className="mb-6">
                        <figure className="flex justify-center mb-4">
                            <label
                                htmlFor="thumbnailUpload"
                                className="cursor-pointer h-[200px] flex justify-center items-center w-full border border-dashed border-gray-300 rounded-lg"
                            >
                                {!thumbnailUrl ? (
                                    <MdOutlineWallpaper className="w-20 h-full text-gray-400" />
                                ) : (
                                    <img
                                        className="h-[200px] object-cover rounded-md"
                                        src={thumbnailUrl}
                                        alt="Thumbnail"
                                    />
                                )}
                            </label>
                            <input
                                onChange={getThumbnail}
                                type="file"
                                hidden
                                name="thumbnail"
                                id="thumbnailUpload"
                            />
                        </figure>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Title
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter blog title"
                            onChange={handleUserInput}
                            value={blogData.title}
                            id="title"
                            name="title"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="content"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Content
                        </label>
                        <textarea
                            placeholder="Enter blog content here"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={blogData.content}
                            onChange={handleUserInput}
                            id="content"
                            name="content"
                            rows={6}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                            type="submit"
                        >
                            Create a new blog
                        </button>
                    </div>
                </form>
            </section>
        </HomeLayout>
    );
}

export default CreateBlog;
