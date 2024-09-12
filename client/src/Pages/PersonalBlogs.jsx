import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPersonalBlogs } from "../Redux/Slices/BlogSlice";
import BlogSkeleton from "../Components/BlogSkeleton";
import HomeLayout from "../Layouts/HomeLayout.jsx";

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
    }

    console.log("Blogs data: ", personalBlogsData);

    return (
        <HomeLayout>
            <h1 className="text-center font-mono tracking-widest uppercase text-4xl font-bold p-5">My Blogs</h1>
            {isLoading && (
                <section className="flex flex-row justify-center items-center h-[100vh] gap-10 flex-wrap">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </section>
            )}
            <section className="m-4 p-10 flex justify-center items-center flex-wrap flex-row gap-10 h-[100vh]">
                {personalBlogsData.map((ele) => (
                    <div key={ele._id} className="w-[500px] rounded-md border">
                        <img
                            src={ele.thumbnail.secure_url}
                            alt="Blog Thumbnail"
                            className="glass h-[200px] w-full rounded-md object-contain"
                        />
                        <div className="p-4">
                            <h1 className="text-lg font-semibold">{ele.title}</h1>
                            <p className="mt-3 text-sm text-gray-600">
                                {ele.content}
                            </p>
                            <button
                                type="button"
                                className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Read
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            <button className="btn btn-accent" onClick={handleBackwardPagination} disabled={page === 1}>Prev Blogs</button>
            <button className="btn btn-accent" onClick={handlePagination} disabled={!hasMore}>Next Blogs</button>
        </HomeLayout>
    );
}

export default PersonalBlogs;
