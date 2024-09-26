import { useDispatch } from "react-redux";
import { toggleBlogLikeThunk, toggleCommentLikeThunk } from "../../Redux/Slices/LikeSlice";
import { BiLike } from "react-icons/bi";
import { useState } from "react";


function ToggleLike({ numberOfLikes, isBlog, blogId, isComment, commentId}) {
    const dispatch = useDispatch();

    const [ totalLikes, setTotalLikes ] = useState(null);

    async function handleToggleLike(e) {
        e.preventDefault();

        if (isBlog) {
            const res = await dispatch(toggleBlogLikeThunk({ blogId }));
            console.log("Like response:", res);
            setTotalLikes(res?.payload?.data?.numberOfLikes);

        } else if (isComment) {
            const res = await dispatch(toggleCommentLikeThunk({ commentId }));
            setTotalLikes(res?.payload?.data?.numberOfLikes);
            console.log("Like response:", res);

        }
    }

    return (
        <div className="flex items-center space-x-2">
            <button onClick={handleToggleLike}>
                <BiLike className="text-2xl text-blue-600" />
            </button>
            <span className="text-lg font-semibold">
                {totalLikes != null ? totalLikes : numberOfLikes}
            </span>
        </div>
    );
}

export default ToggleLike;

