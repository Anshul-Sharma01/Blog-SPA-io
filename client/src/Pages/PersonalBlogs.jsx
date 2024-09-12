import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPersonalBlogs } from "../Redux/Slices/BlogSlice";
import BlogSkeleton from "../Components/BlogSkeleton";

function PersonalBlogs(){


    const dispatch = useDispatch();
    const [ personalBlogsData, setPersonalBlogsData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const resultAction = await dispatch(fetchPersonalBlogs());
                setPersonalBlogsData(resultAction?.payload?.data);
                setIsLoading(false);
                console.log(resultAction);
            } catch (error) {
                console.error("Failed to fetch personal blogs: ", error);
            }
        }
        fetchBlogs();
    }, [dispatch]);
    
    console.log(personalBlogsData);
    return(
        <>
            {
                isLoading && (
                    <BlogSkeleton/>
                )
            }
            
        </>
    )
}

export default PersonalBlogs;


