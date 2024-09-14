import { useState } from "react";
import { MdOutlineWallpaper } from "react-icons/md";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewBlog } from "../Redux/Slices/BlogSlice.js";

function CreateBlog(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ thumbnailUrl, setThumbnailUrl ] = useState("");
    const [ blogData, setBlogData ] = useState({
        title : "",
        content : "",
        thumbnail : ""
    })

    function handleUserInput(e){
        const { name, value } = e.target;
        setBlogData({
            ...blogData,
            [name] : value
        })
    }

    function getThumbnail(e){
        e.preventDefault();

        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            setBlogData({
                ...blogData,
                thumbnail: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setThumbnailUrl(this.result);
            })
        }
    }

    async function handleFormSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("content", blogData.content);
        formData.append("thumbnail", blogData.thumbnail);

        const res = await dispatch(createNewBlog(formData));

        if(res.meta.requestStatus === 'fulfilled'){
            navigate("/blogs/me");
        }

    }


    return(
        <HomeLayout>
            <section className="flex flex-row justify-center items-center h-[100vh]">
                <form onSubmit={handleFormSubmit}>
                    <div className="card card-side bg-base-100 shadow-xl">
                    <figure>
                        <label htmlFor="thumbnailUpload" className="cursor-pointer h-[200px] flex justify-center items-center">
                            {
                                !thumbnailUrl ? (
                                    <MdOutlineWallpaper className="w-20 h-full text-4xl block" />
                                ) : (
                                    <img className="h-[300px] object-cover" src={thumbnailUrl} />
                                )
                            }
                        </label>
                        <input onChange={getThumbnail} type="file" hidden name="thumbnail" id="thumbnailUpload" />
                    </figure>

                        <div className="card-body p-8">
                            <h1 className="card-title px-4 py-2">New Blog Post</h1>
                            
                            <div className="w-full md:w-1/3 text-left">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="title"
                                >
                                    Title
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter blog title"
                                    onChange={handleUserInput}
                                    value={blogData.title}
                                    id="title"
                                    name="title"
                                ></input>
                            </div>
                            <div className="w-full md:w-1/3 text-left mt-4">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="content"
                                >
                                    Content
                                </label>
                                <textarea
                                    placeholder="Enter blog content here"
                                    className="textarea textarea-bordered textarea-lg"
                                    value={blogData.content}
                                    onChange={handleUserInput}
                                    id="content"
                                    name="content"
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-accent">Create a new blog</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </HomeLayout>
    )
}


export default CreateBlog;
