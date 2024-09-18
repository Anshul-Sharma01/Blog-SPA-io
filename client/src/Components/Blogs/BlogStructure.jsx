import { BiLike } from "react-icons/bi";
import { LuUser2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleFavThunk } from "../../Redux/Slices/FavouritesSlice";

function BlogStructure({ thumbnail, title, numberOfLikes, author, blogId, blogUserId }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ toggleFavourite, setToggleFavourite ] = useState(false);
    async function handletoggleFavourite(e){
        e.preventDefault();

        const res = await dispatch(toggleFavThunk({ blogId, blogUserId}));

        if(res?.payload?.success === true){
            setToggleFavourite(true);
            navigate("/blogs/all");
        }

    }


    return (
        <div className="w-[450px] rounded-lg border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2 bg-white overflow-hidden">
            
            <img
                src={thumbnail}
                alt="Blog Thumbnail"
                className="h-[200px] w-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />


            <div className="p-6 space-y-4">

                <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-900 transition-colors duration-300">
                    {title}
                </h1>


                <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center space-x-4">
                
                        <div className="flex items-center space-x-2">
                            <BiLike className="text-2xl text-blue-600" />
                            <span className="text-lg font-semibold">{numberOfLikes}</span>
                        </div>

                        
                        <div>
                            <button onClick={(e) => handletoggleFavourite(e)}>
                                <MdOutlineStarBorder className="text-3xl text-yellow-400 hover:text-yellow-500 transition-colors duration-300 cursor-pointer" />
                            </button>
                        </div>
                    </div>

                    {author && (
                        <div className="flex items-center space-x-2 text-gray-800">
                            <LuUser2 className="text-2xl" />
                            <span className="text-sm font-semibold uppercase tracking-wider">
                                {author}
                            </span>
                        </div>
                    )}
                </div>

                <Link to={`/blogs/view/${blogId}`}>
                    <button
                        type="button"
                        className="mt-4 w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300 hover:from-teal-500 hover:to-blue-600"
                    >
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default BlogStructure;
