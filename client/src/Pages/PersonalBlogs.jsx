import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPersonalBlogs } from "../Redux/Slices/BlogSlice";
import BlogSkeleton from "../Components/BlogSkeleton";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { BiLike } from "react-icons/bi";

function PersonalBlogs() {
    const dispatch = useDispatch();
    const [personalBlogsData, setPersonalBlogsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setLimit] = useState(3);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    async function fetchBlogs() {
        try {
            const resultAction = await dispatch(fetchPersonalBlogs({ limit, page }));
            console.log(resultAction);

            if (resultAction?.payload?.data?.myBlogs) {
                if (resultAction.payload.data.myBlogs.length < limit) {
                    setHasMore(false);
                }
                setPersonalBlogsData(resultAction.payload.data.myBlogs);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch personal blogs: ", error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [dispatch, page, limit]);

    function handlePagination() {
        if (hasMore) {
            setPage((prev) => prev + 1);
        }
    }

    function handleBackwardPagination() {
        setPage((prev) => Math.max(prev - 1, 1));
        setHasMore(hasMore === false ? true : false);
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
                        <div key={ele._id} className="w-[450px] rounded-lg border shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={ele.thumbnail.secure_url}
                                alt="Blog Thumbnail"
                                className="h-[200px] w-full rounded-t-lg object-cover"
                            />
                            <div className="p-6">
                                <h1 className="text-2xl font-bold">{ele.title}</h1>
                                <div className="flex items-center mt-4 text-gray-600">
                                    <BiLike className="text-2xl mr-2" />
                                    <span className="text-lg">{ele.numberOfLikes}</span>
                                </div>
                                <button
                                    type="button"
                                    className="mt-4 w-full rounded-md btn  px-4 py-2 text-sm font-medium text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 btn-accent"
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
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
                    className={`btn btn-outline ${!hasMore ? "btn-disabled" : ""}`}
                    onClick={handlePagination}
                    disabled={!hasMore}
                >
                    Next
                </button>
            </div>
        </HomeLayout>
    );
}

export default PersonalBlogs;
