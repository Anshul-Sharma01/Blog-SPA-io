import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomeLayout from "../Layouts/HomeLayout.jsx";
import { fetchAllBlogsThunk } from "../Redux/Slices/BlogSlice.js";
import BlogSkeleton from "../Components/Blogs/BlogSkeleton.jsx";
import BlogStructure from "../Components/Blogs/BlogStructure.jsx";

function AllBlogs() {
    const [allBlogsData, setAllBlogsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(6);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchAllBlogs() {
        try {
            const res = await dispatch(fetchAllBlogsThunk({ limit, page }));
            if (res?.payload?.data?.totalBlogs == 0) {
                navigate("/");
            }
            if (res?.payload?.data?.allBlogs) {
                setAllBlogsData(res?.payload?.data?.allBlogs);
                setTotalPages(res?.payload?.data?.totalPages);
                setIsLoading(false);
            }
        } catch (err) {
            console.log("Error occurred in fetching all Blogs : ", err);
        }
    }

    useEffect(() => {
        fetchAllBlogs();
    }, [dispatch, page]);

    function handleForwardPagination() {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    }

    function handleBackwardPagination() {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    }

    return (
        <HomeLayout>
            <h1 className="text-center font-mono tracking-wide text-5xl font-bold py-12 text-gray-800 drop-shadow-lg">
                Explore All Blogs
            </h1>

            {isLoading ? (
                <section className="flex justify-center items-center min-h-[60vh] gap-10 flex-wrap px-4">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </section>
            ) : (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 md:p-10 w-full max-w-7xl mx-auto">
                    {allBlogsData.map((ele) => (
                        <BlogStructure
                            blogId={ele._id}
                            key={ele._id}
                            thumbnail={ele.thumbnail.secure_url}
                            title={ele.title}
                            category={ele.category}
                            numberOfLikes={ele.numberOfLikes}
                            author={ele?.owner?.username || "account deleted"}
                            authorId={ele?.owner?._id}
                        />
                    ))}
                </section>
            )}

            <div className="flex justify-center items-center py-10 gap-5">
                <button
                    className={`btn btn-outline ${page === 1 ? "btn-disabled" : ""} transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
                    onClick={handleBackwardPagination}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className={`btn btn-outline ${page >= totalPages ? "btn-disabled" : ""} transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
                    onClick={handleForwardPagination}
                    disabled={page >= totalPages}
                >
                    Next
                </button>
            </div>
        </HomeLayout>
    );
}

export default AllBlogs;
