import { LiaCommentsSolid } from "react-icons/lia";
import { useState } from "react";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { fetchAllCommentsThunk } from "../../Redux/Slices/CommentSlice.js";
import AddComment from './AddComment';

function Comments({ blogId }) {
    const dispatch = useDispatch();
    const [commentsData, setCommentsData] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    async function fetchAllComments() {
        const res = await dispatch(fetchAllCommentsThunk({ blogId }));
        if (res?.payload?.data) {
            setCommentsData(res.payload.data);
        }
    }

    const handleCollapseClick = () => {
        setIsExpanded(!isExpanded);
        if (!hasFetched) {
            fetchAllComments();
            setHasFetched(true);
        }
    };

    const handleCommentAdded = () => {
        fetchAllComments();
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div
                tabIndex={0}
                className="collapse collapse-arrow border border-gray-300 bg-gray-100 rounded-lg shadow-md mb-8"
                onClick={handleCollapseClick}
            >
                <div className="collapse-title text-lg font-semibold flex flex-row justify-between items-center p-4">
                    Click here to view Comments <LiaCommentsSolid className="text-2xl" />
                </div>
                {isExpanded && (
                    <div className="collapse-content p-4 space-y-6">
                        {commentsData.length === 0 ? (
                            <h3 className="text-gray-500 text-center">No Comments Yet</h3>
                        ) : (
                            commentsData.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    imgSrc={comment?.owner?.avatar?.secure_url}
                                    ownerName={comment?.owner?.username}
                                    content={comment.content}
                                    totalLikes={comment.totalLikes || 0}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>


            <AddComment blogId={blogId} onCommentAdded={handleCommentAdded} />
        </div>
    );
}

export default Comments;
