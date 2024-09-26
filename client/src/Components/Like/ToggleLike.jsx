import { useDispatch } from "react-redux";
import { toggleBlogLikeThunk, toggleCommentLikeThunk } from "../../Redux/Slices/LikeSlice";
import { BiLike } from "react-icons/bi";


function ToggleLike({ numberOfLikes, isBlog, blogId, fetchBlogs, isComment, commentId, fetchComments }) {
    const dispatch = useDispatch();

    async function handleToggleLike(e) {
        e.preventDefault();

        if (isBlog) {
            const res = await dispatch(toggleBlogLikeThunk({ blogId }));
            console.log("Like response:", res);
            if (fetchBlogs) {
                fetchBlogs(); 
            }
        } else if (isComment) {
            const res = await dispatch(toggleCommentLikeThunk({ commentId }));
            console.log("Like response:", res);
            if (fetchComments) {
                fetchComments();  
            }
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <button onClick={handleToggleLike}>
                <BiLike className="text-2xl text-blue-600" />
            </button>
            <span className="text-lg font-semibold">
                {numberOfLikes || 0}
            </span>
        </div>
    );
}

export default ToggleLike;

