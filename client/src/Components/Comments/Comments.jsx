import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { fetchAllCommentsThunk } from "../../Redux/Slices/CommentSlice.js";
import Comment from "./Comment";
import AddComment from './AddComment';
import { LiaCommentsSolid } from "react-icons/lia";

function Comments({ blogId }) {
    const dispatch = useDispatch();
    const [commentsData, setCommentsData] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFirstFetch, setIsFirstFetch] = useState(true);

    useEffect(() => {
        if (isExpanded && isFirstFetch) {
            fetchAllComments();
            setIsFirstFetch(false);
        }
    }, [isExpanded]);

    async function fetchAllComments() {
        console.log("Fetching comments...");
        const res = await dispatch(fetchAllCommentsThunk({ blogId }));
        if (res?.payload?.data) {
            setCommentsData(res.payload.data);
        } else {
            console.error("Failed to fetch comments:", res?.payload?.message);
        }
    }

    function handleCommentsFetch(){
        fetchAllComments();
    }

    const handleToggleComments = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="max-w-2xl mx-auto my-8">
            <div 
                className="flex items-center justify-between p-4 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer"
                onClick={handleToggleComments}
            >
                <span className="text-lg font-semibold text-gray-800">Comments</span>
                <LiaCommentsSolid className={`text-2xl transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
            
            {isExpanded && (
                <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mt-4 space-y-6">
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
                                commentId={comment?._id}
                                handleCommentsFetch={handleCommentsFetch}
                            />
                        ))
                    )}
                </div>
            )}

            <AddComment blogId={blogId} handleCommentsFetch={handleCommentsFetch} />
        </div>
    );
}

export default Comments;
