import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPersonalBlogs } from "../Redux/Slices/BlogSlice";
import BlogSkeleton from "../Components/Blogs/BlogSkeleton.jsx";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import BlogStructure from "../Components/Blogs/BlogStructure.jsx";
import { useNavigate } from "react-router-dom";

function PersonalBlogs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [personalBlogsData, setPersonalBlogsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit] = useState(3);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const resultAction = await dispatch(fetchPersonalBlogs({ limit, page }));

                const blogs = resultAction?.payload?.data?.myBlogs || [];
                const total = resultAction?.payload?.data?.totalPages || 1;

                if (blogs.length === 0 && page === 1) {
                    navigate("/blogs/all");  // Redirect if no blogs found
                    return;
                }

                setPersonalBlogsData(blogs);
                setTotalPages(total);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch personal blogs: ", error);
            }
        }

        fetchBlogs();
    }, [dispatch, page, limit, navigate]);

    return (
        <HomeLayout>
            <h1 className="text-center font-mono tracking-widest uppercase text-4xl font-bold py-10">My Blogs</h1>
            {isLoading ? (
                <section className="flex justify-center items-center h-[60vh] gap-10 flex-wrap">
                    {[...Array(6)].map((_, index) => <BlogSkeleton key={index} />)}
                </section>
            ) : (
                <section className="m-4 p-10 flex justify-center items-center flex-wrap gap-10">
                    {personalBlogsData.map((ele) => (
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

            <div className="flex justify-between items-center px-10 py-5">
                <button
                    className={`btn btn-outline ${page === 1 ? "btn-disabled" : ""}`}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className={`btn btn-outline ${page >= totalPages ? "btn-disabled" : ""}`}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page >= totalPages}
                >
                    Next
                </button>
            </div>
        </HomeLayout>
    );
}

export default PersonalBlogs;