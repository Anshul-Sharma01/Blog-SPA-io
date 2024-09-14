import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import  { fetchPersonalBlogs } from "../Redux/Slices/BlogSlice";
import BlogSkeleton from "../Components/Blogs/BlogSkeleton.jsx";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { BiLike } from "react-icons/bi";
import BlogStructure from "../Components/Blogs/BlogStructure.jsx";

function PersonalBlogs() {
    const dispatch = useDispatch();
    const [personalBlogsData, setPersonalBlogsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit] = useState(3);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    async function fetchBlogs() {
        try {
            const resultAction = await dispatch(fetchPersonalBlogs({ limit, page }));
            console.log(resultAction);

            if (resultAction?.payload?.data?.myBlogs) {
                setPersonalBlogsData(resultAction.payload.data.myBlogs);
                setTotalPages(resultAction.payload.data.totalPages);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Failed to fetch personal blogs: ", error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [dispatch, page]);

    function handlePagination() {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    }

    function handleBackwardPagination() {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    }

    console.log("Blogs data: ", personalBlogsData);

    return (
        <HomeLayout>
            <h1 className="text-center font-mono tracking-widest uppercase text-4xl font-bold py-10">My Blogs</h1>
            {isLoading ? (
                <section className="flex justify-center items-center h-[60vh] gap-10 flex-wrap">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </section>
            ) : (
                <section className="m-4 p-10 flex justify-center items-center flex-wrap gap-10">
                    {personalBlogsData.map((ele) => (
                        <BlogStructure blogId = {ele._id} key={ele._id} thumbnail={ele?.thumbnail?.secure_url} title={ele.title} numberOfLikes={ele.numberOfLikes}/> 
                    ))}
                </section>
            )}

            <div className="flex justify-between items-center px-10 py-5">
                <button
                    className={`btn btn-outline ${page === 1 ? "btn-disabled" : ""}`}
                    onClick={handleBackwardPagination}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className={`btn btn-outline ${page >= totalPages ? "btn-disabled" : ""}`}
                    onClick={handlePagination}
                    disabled={page >= totalPages}
                >
                    Next
                </button>
            </div>
        </HomeLayout>
    );
}

export default PersonalBlogs;
