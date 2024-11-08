import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { fetchAllBlogsThunk, fetchSearchBlogs } from "../Redux/Slices/BlogSlice.js";
import BlogSkeleton from "../Components/Blogs/BlogSkeleton.jsx";
import BlogStructure from "../Components/Blogs/BlogStructure.jsx";
import SearchBlogs from "../Components/Blogs/SearchBlogs.jsx";

function AllBlogs() {
    const [allBlogsData, setAllBlogsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(6);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [fetchAll, setFetchAll] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchBlogs() {
        setIsLoading(true);
        try {
            let res;
            if (isSearching && query) {
                res = await dispatch(fetchSearchBlogs({ limit, page, query }));
            } else {
                res = await dispatch(fetchAllBlogsThunk({ limit, page }));
            }
            const blogData = res?.payload?.data;
            if (blogData?.totalBlogs === 0) {
                navigate("/");
            } else if (blogData?.blogs) {
                setAllBlogsData(blogData.blogs);
                setTotalPages(blogData.totalPages);
                setIsLoading(false);
            }
        } catch (err) {
            console.log("Error occurred in fetching blogs: ", err);
            setIsLoading(false);
        }
    }

    // Trigger fetching all blogs when `fetchAll` is set to true
    useEffect(() => {
        if (fetchAll) {
            setIsSearching(false); // Reset searching state
            setQuery(""); // Clear search query
            setPage(1); // Reset to the first page
            fetchBlogs(); // Fetch all blogs
            setFetchAll(false); // Reset fetchAll to prevent infinite calls
        }
    }, [fetchAll]);

    useEffect(() => {
        fetchBlogs();
    }, [dispatch, page, isSearching, query]);

    const handleSearch = (query) => {
        setQuery(query);
        setIsSearching(!!query); // Set `isSearching` to true if `query` is non-empty
        setPage(1);
    };

    const handleForwardPagination = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handleBackwardPagination = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <HomeLayout>
            <div className="text-center font-mono tracking-wide text-5xl font-bold py-12 text-gray-800 drop-shadow-lg flex flex-col justify-center items-center gap-10">
                <h1>Explore All Blogs</h1>
                <div className="w-[500px]">
                    <SearchBlogs setFetchAll={setFetchAll} className="w-full" onSearch={handleSearch} />
                </div>
            </div>

            {isLoading ? (
                <section className="flex justify-center items-center min-h-[60vh] gap-10 flex-wrap px-4">
                    {[...Array(6)].map((_, i) => (
                        <BlogSkeleton key={i} />
                    ))}
                </section>
            ) : (
                <section className="m-4 p-10 flex justify-center items-center flex-wrap gap-10">
                    {allBlogsData.map((ele) => (
                        <BlogStructure
                            key={ele._id}
                            blogId={ele._id}
                            thumbnail={ele.thumbnail.secure_url}
                            title={ele.title}
                            category={ele.category}
                            numberOfLikes={ele.numberOfLikes}
                            author={ele.owner?.username || "account deleted"}
                            authorId={ele.owner?._id}
                            disableAuthorLink={!ele.owner}
                        />
                    ))}
                </section>
            )}

            <div className="flex justify-center items-center py-10 gap-5">
                <button
                    className={`btn btn-outline ${page === 1 ? "btn-disabled opacity-50" : ""} transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
                    onClick={handleBackwardPagination}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className={`btn btn-outline ${page >= totalPages ? "btn-disabled opacity-50" : ""} transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
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
