import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllFavThunk } from "../Redux/Slices/FavouritesSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BlogStructure from "../Components/Blogs/BlogStructure";
import BlogSkeleton from "../Components/Blogs/BlogSkeleton.jsx";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import ClearAllFav from "../Components/Blogs/ClearAllFav.jsx";

function MyFavourites(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ favblogs, setFavBlogs ] = useState([]); 

    async function fetchFavourites(){
        try{
            const res = await dispatch(getAllFavThunk());
            if(res?.payload?.data.length == 0){
                navigate("/blogs/all");
            }
            setFavBlogs(res?.payload?.data);
            setIsLoading(false);
            console.log(favblogs);
            console.log("Favourites Response : ", res);
        }catch(err){
            console.log("Error occurred at favourites : ", err);
        }
    }

    useEffect(() => {
        fetchFavourites();
    }, [])

    return(
        <HomeLayout>
            <section className="flex flex-col justify-center items-center gap-4">

                <h1 className="text-center font-mono tracking-widest uppercase text-4xl font-bold py-10">
                    My Favourites
                </h1>

                {
                    isLoading && (
                        <>
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        
                        </>
                    )
                }
                <section className="flex flex-col justify-center items-center flex-wrap gap-10">
                    {
                        !isLoading && (
                            
                            favblogs?.map((ele) => {
                                return <BlogStructure
                                    blogId={ele?.blog._id}
                                    key={ele?.blog._id}
                                    thumbnail={ele?.blog?.thumbnail?.secure_url}
                                    title={ele?.blog?.title}
                                    numberOfLikes={ele?.blog?.numberOfLikes}
                                    author={ele?.blogOwner?.username}
                                    blogUserId={ele?.blogOwner?._id}
                                />
                            })
                        )
                    }
                </section>

                <button onClick={() => document.getElementById("clearFav_modal").showModal()} className="btn btn-error w-[200px] px-6 py-4">
                    Clear Favourites
                </button>
            </section>
            <ClearAllFav />
        </HomeLayout>
    )
}

export default MyFavourites;

