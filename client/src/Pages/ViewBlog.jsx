import React, { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBlogThunk } from '../Redux/Slices/BlogSlice.js';
import HomeLayout from '../Layouts/HomeLayout.jsx';
import UpdateBlogData from '../Components/Blogs/UpdateBlogData.jsx';
import UpdateBlogAvatar from '../Components/Blogs/UpdateBlogAvatar.jsx';
import DeleteBlog from '../Components/Blogs/DeleteBlog.jsx';
import FavCount from '../Components/Blogs/FavCount.jsx';
import Comments from '../Components/Comments/Comments.jsx';
import { MdOutlineAddComment } from "react-icons/md";
import AddComment from '../Components/Comments/AddComment.jsx';


function ViewBlog() {
    const { blogId } = useParams();
    const [ blogID, setBlogID ] = useState(blogId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [blogData, setBlogData] = useState({});
    const [isOwner, setIsOwner] = useState(false);

    const currentUserId = useSelector((state) => state?.auth?.userData?._id);

    async function fetchBlogData() {
        const res = await dispatch(fetchBlogThunk({ blogId }));

        if (res?.payload?.data) {
            setBlogData(res.payload.data);

            if (res.payload.data.owner._id === currentUserId) {
                setIsOwner(true);
            }
        }
    }

    useEffect(() => {
        fetchBlogData();
    }, [dispatch, blogId, currentUserId]);

    return (
        <HomeLayout>
            <div className="max-w-4xl flex flex-col justify-center items-center mx-auto p-6 space-y-8">
                <img
                    src={blogData?.thumbnail?.secure_url || ""}
                    alt="Blog Thumbnail"
                    className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8 transition-transform duration-300 ease-in-out hover:scale-105"
                />

                <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 md:mb-6">
                    {blogData?.title || ""}
                </h1>

                <div className="text-center text-gray-500 italic mb-4 md:mb-6 text-lg">
                    <p>By {blogData?.owner?.username || "Unknown"}</p>
                </div>

                <div className="prose w-full max-w-none text-lg leading-relaxed text-gray-700 bg-white p-6 rounded-lg shadow-md">
                    <div
                        className="whitespace-pre-wrap break-words"
                        style={{ width: '100%' }}
                        dangerouslySetInnerHTML={{ __html: blogData?.content || "" }}
                    />
                </div>

                {isOwner && (
                    <div className="flex flex-row gap-6 justify-center items-center mt-8">
                        <button
                            className="btn btn-warning px-6 py-3 text-lg shadow-lg transition duration-300 ease-in-out hover:bg-yellow-500"
                            onClick={() => document.getElementById("blog_avatar_modal").showModal()}
                        >
                            Update Thumbnail
                        </button>
                        <button
                            className="btn btn-success px-6 py-3 text-lg shadow-lg transition duration-300 ease-in-out hover:bg-green-500"
                            onClick={() => document.getElementById("blog_modal_1").showModal()}
                        >
                            Update Blog
                        </button>
                        <button
                            className="btn btn-error px-6 py-3 text-lg shadow-lg transition duration-300 ease-in-out hover:bg-red-500"
                            onClick={() => document.getElementById('delete_blog_modal').showModal()}
                        >
                            Delete Blog
                        </button>
                        <button
                            className="btn btn-accent px-6 py-3 text-lg shadow-lg transition duration-300 ease-in-out hover:bg-yellow-400"
                            onClick={() => document.getElementById('favCount_modal').showModal()}
                        >
                            Stars Count
                        </button>
                    </div>
                )}

            </div>

            {isOwner && (
                <>
                    <UpdateBlogData blogId={blogId} />
                    <UpdateBlogAvatar blogId={blogId} />
                    <DeleteBlog blogId={blogId} />
                    <FavCount blogId={blogId} />
                </>
            )}
            <button className='text-4xl' onClick={() => document.getElementById("comment_modal").showModal()}>
                <MdOutlineAddComment/>
            </button>


            <Comments blogId={blogID}/>
            <AddComment blogId={blogID}/>

        </HomeLayout>
    );
}

export default ViewBlog;
