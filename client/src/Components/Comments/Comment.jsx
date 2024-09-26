import React from 'react';
import { BiLike } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DeleteComment from './DeleteComment.jsx';
import { toggleCommentLikeThunk } from '../../Redux/Slices/LikeSlice.js';
import ToggleLike from '../Like/ToggleLike.jsx';


function Comment({ imgSrc, ownerName, commentId, content, totalLikes, handleCommentsFetch }) {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state?.auth?.userData?.username);



    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="flex items-start space-x-4">
                <img
                    src={imgSrc}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                />
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <h4 className="text-md font-semibold text-gray-800">{ownerName || "Unknown"}</h4>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                                <ToggleLike numberOfLikes={totalLikes} isBlog={false} isComment={true} commentId={commentId}/>
                            </div>
                            {userName === ownerName && (
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => document.getElementById("delete_comment").showModal()}
                                >
                                    <MdOutlineDeleteForever className="text-lg" />
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-700 mt-2 text-sm leading-relaxed">{content || "Unable to fetch..."}</p>
                </div>
            </div>

            <DeleteComment commentId={commentId} handleCommentsFetch={handleCommentsFetch} />
        </div>
    );
}

export default Comment;
