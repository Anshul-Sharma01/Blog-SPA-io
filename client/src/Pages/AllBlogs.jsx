import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import HomeLayout from "../Layouts/HomeLayout.jsx";
import { fetchAllBlogsThunk } from "../Redux/Slices/BlogSlice.js";
import BlogSkeleton from "../Components/BlogSkeleton.jsx";
import BlogStructure from "../Components/BlogStructure.jsx";


function AllBlogs(){

    const [ allBlogsData, setAllBlogsData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ limit ] = useState(6);
    const [ page, setPage ] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchAllBlogs(){
        try{
            const res = await dispatch(fetchAllBlogsThunk({ limit, page }));
            if(res?.payload?.data?.allBlogs){
                setAllBlogsData(res?.payload?.data?.allBlogs);
                setTotalPages(res?.payload?.data?.totalPages);
                setIsLoading(false);
            }
        }catch(err){
            console.log("Error occurred in fetching all Blogs : ", err);
        }
    }

    useEffect(() => {
        fetchAllBlogs();  
    }, [ dispatch, page ]);

    function handleForwardPagination() {
        if( page < totalPages ){
            setPage( (prev) => prev + 1 );
        }
    }

    function handleBackwardPagination(){
        if( page > 1 ){
            setPage((prev) => prev - 1);
        }
    }

    console.log("All Blogs data : ", allBlogsData);



    return(
        <HomeLayout>
            <h1 className="text-center font-mono tracking-widest uppercase text-4xl font-bold py-10">All Blogs</h1>
            {
                isLoading ? (
                    <section className="flex justify-center items-center h-[100vh] gap-10 flex-wrap">
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                    </section>
                ) : (
                    <section className="m-4 p-10 flex flex-row justify-center items-center flex-wrap gap-10 w-[80vw]">
                        {
                            allBlogsData.map((ele) => (
                                <BlogStructure
                                    key={ele._id}
                                    thumbnail={ele.thumbnail.secure_url}
                                    title={ele.title}
                                    numberOfLikes={ele.numberOfLikes}
                                    author={ele.owner.username}
                                />
                            ))
                        }
                    </section>
                )
            }

            <div className="flex justify-center items-center px-10 gap-20 py-5">
                <button 
                    className={`btn btn-outline ${page === 1 ? "btn-disabled" : ""}`}
                    onClick={handleBackwardPagination}
                    disabled = {page === 1}
                >
                    Previous Page
                </button>
                <button
                    className={`btn btn-outline ${page >= totalPages ? "btn-disabled" : ""}`}
                    onClick={handleForwardPagination}
                    disabled = {page >= totalPages}
                >
                    Next Page
                </button>
            </div>
        </HomeLayout>
    )
}


export default AllBlogs;
