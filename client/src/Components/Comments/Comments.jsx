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
        <>
            <div
                tabIndex={0}
                className="collapse collapse-arrow border-base-300 bg-base-200 border"
                onClick={handleCollapseClick} 
            >
                <div className="collapse-title text-xl font-medium flex flex-row justify-center items-center gap-10">
                    Click here to view Comments <LiaCommentsSolid />
                </div>
                <div className="collapse-content">
                    {commentsData.length === 0 ? (
                        <h3>No Comments Yet</h3>
                    ) : (
                        <>
                            {commentsData.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    imgSrc={comment?.owner?.avatar?.secure_url}
                                    ownerName={comment?.owner?.username}
                                    content={comment.content}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>

    
            <AddComment blogId={blogId} onCommentAdded={handleCommentAdded} />
        </>
    );
}

export default Comments;
