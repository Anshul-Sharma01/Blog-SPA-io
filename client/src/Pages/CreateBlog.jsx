import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { MdOutlineWallpaper } from "react-icons/md";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewBlog } from "../Redux/Slices/BlogSlice.js";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

function CreateBlog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        category : "",
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
        if (!blogData.title || !blogData.content || !blogData.thumbnail || !blogData.category) {
            toast.error("All fields are mandatory");
            return;
        }

        const sanitizedContent = DOMPurify.sanitize(blogData.content);

        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("content", sanitizedContent);
        formData.append("thumbnail", blogData.thumbnail);
        formData.append("category", blogData.category);

        const res = await dispatch(createNewBlog(formData));
        if (res.meta.requestStatus === "fulfilled") {
            navigate("/blogs/me");
        }
    }

    return (
        <HomeLayout>
            <section className="flex flex-col h-full min-h-screen bg-gray-100 p-8">
                <form
                    onSubmit={handleFormSubmit}
                    className="bg-white shadow-md rounded-lg p-8 w-full h-full max-h-[90vh] overflow-y-auto"
                >
                    <div className="mb-6">
                        <figure className="flex justify-center mb-4">
                            <label
                                htmlFor="thumbnailUpload"
                                className="cursor-pointer h-[300px] flex justify-center items-center w-full border border-dashed border-gray-300 rounded-lg"
                            >
                                {!thumbnailUrl ? (
                                    <MdOutlineWallpaper className="w-20 h-full text-gray-400" />
                                ) : (
                                    <img
                                        className="h-[300px] object-cover rounded-md"
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
                            htmlFor="category"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Category
                        </label>
                        <input 
                            type="text"
                            className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter blog category"
                            onChange={handleUserInput}
                            value={blogData.category}
                            id="category"
                            name="category"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="content"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Content
                        </label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={blogData.content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setBlogData({ ...blogData, content: data });
                            }}
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
