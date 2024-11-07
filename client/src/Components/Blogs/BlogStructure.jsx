
import { FaRegUserCircle } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineStar, MdStar } from "react-icons/md"; 
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleFavThunk } from "../../Redux/Slices/FavouritesSlice";
import ToggleLike from "../Like/ToggleLike";

function BlogStructure({ thumbnail, title, numberOfLikes, author, authorId, disableAuthorLink, blogId, category}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [toggleFavourite, setToggleFavourite] = useState(false);

    async function handletoggleFavourite(e) {
        e.preventDefault();

        const res = await dispatch(toggleFavThunk({ blogId, authorId }));
        navigate("/blogs/all");

        if (res?.payload?.success === true) {
            setToggleFavourite(!toggleFavourite);
        }
    }

    return (
        <div className="w-[450px] rounded-lg border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2 bg-white overflow-hidden">
            <Link to={`/blogs/view/${blogId}`}>
                <img
                    src={thumbnail}
                    alt="Blog Thumbnail"
                    className="h-[200px] w-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                />
            </Link>
    
            <div className="p-6 space-y-4">
                <Link to={`/blogs/view/${blogId}`}>
                    <h1 className="text-2xl font-bold text-gray-800 transition-colors duration-150 cursor-pointer hover:text-blue-600">
                        {title}
                    </h1>
                </Link>
    
                <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-lg font-semibold shadow-md">
                    {category || "Category not added"}
                </div>
    
                <div className="flex items-center justify-between text-gray-600 mt-4">
                    <div className="flex items-center space-x-4">
                        <ToggleLike isBlog={true} numberOfLikes={numberOfLikes} blogId={blogId} />
    
                        <button
                            onClick={handletoggleFavourite}
                            className="text-3xl text-yellow-400 hover:text-yellow-500 transition-colors duration-300 cursor-pointer"
                        >
                            {toggleFavourite ? <MdStar /> : <MdOutlineStar />}
                        </button>
                    </div>
    
                    <div className="flex items-center space-x-2 text-gray-800">
                        {authorId === "account deleted" || disableAuthorLink ? (
                            <div className="flex items-center space-x-2  text-red-500">
                                <FaRegUserCircle className="text-2xl" />
                                <span className="text-sm font-semibold uppercase tracking-wider">
                                    {author}
                                </span>
                            </div>
                        ) : (
                            <Link
                                to={`/view/author-profile/${authorId}`}
                                className="hover:text-blue-700 flex items-center space-x-2"
                            >
                                <FaRegUserCircle className="text-2xl" />
                                <span className="text-sm font-semibold uppercase tracking-wider">
                                    {author}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    
    
}

export default BlogStructure;
