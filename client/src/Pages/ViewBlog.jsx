import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBlogThunk } from '../Redux/Slices/BlogSlice';
import HomeLayout from '../Layouts/HomeLayout';
import UpdateBlogData from '../Components/Blogs/UpdateBlogData';
import UpdateBlogAvatar from '../Components/Blogs/UpdateBlogAvatar';

function ViewBlog() {
    const { blogId } = useParams();
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
            <div className="max-w-4xl flex flex-col justify-center items-center mx-auto p-6">
                <img
                    src={blogData?.thumbnail?.secure_url || ""}
                    alt="Blog Thumbnail"
                    className="w-full h-[400px] object-contain rounded-lg shadow-md mb-8"
                />

                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    <input
                        type="text"
                        className="block w-fit px-4 py-4 rounded-md h-fit ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                        value={blogData?.title || ""}
                        disabled
                    />
                </h1>

                <div className="text-center text-gray-500 italic mb-8">
                    <p>By {blogData?.owner?.username || "Unknown"}</p>
                </div>

                <div className="prose max-w-none text-lg leading-relaxed text-gray-700">
                    <textarea
                        name=""
                        id=""
                        value={blogData?.content || ""}
                        cols="50"
                        disabled
                    />
                </div>

                {isOwner && (
                    <div className='card-actions flex flex-row gap-20 justify-center items-center'>
                        <button
                            className='btn btn-warning px-4 py-2'
                            onClick={() => document.getElementById("blog_avatar_modal").showModal()}
                        >
                            Update Thumbnail
                        </button>
                        <button
                            className='btn btn-success px-4 py-2'
                            onClick={() => document.getElementById("blog_modal_1").showModal()}
                        >
                            Update Blog
                        </button>
                    </div>
                )}
            </div>
            {isOwner && (
                <>
                    <UpdateBlogData blogId={blogId} />
                    <UpdateBlogAvatar blogId={blogId} />
                </>
            )}
        </HomeLayout>
    );
}

export default ViewBlog;
