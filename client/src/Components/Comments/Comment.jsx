import React, { useState } from 'react';
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DeleteComment from './DeleteComment.jsx';
import ToggleLike from '../Like/ToggleLike.jsx';

function Comment({ imgSrc, ownerName, commentId, content, totalLikes, handleCommentsFetch }) {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state?.auth?.userData?.username);
    const [showModal, setShowModal] = useState(false);

    const openDeleteModal = () => {
        console.log("Opening Modal for comment ID:", commentId);
        setShowModal(true);
    };

    const closeDeleteModal = () => {
        console.log("Closing Modal");
        setShowModal(false);  
    };

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
                                <ToggleLike numberOfLikes={totalLikes} isBlog={false} isComment={true} commentId={commentId} />
                            </div>
                            {userName === ownerName && (
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={openDeleteModal} 
                                >
                                    <MdOutlineDeleteForever className="text-lg" />
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-700 mt-2 text-sm leading-relaxed">{content || "Unable to fetch..."}</p>
                </div>
            </div>

            {showModal && (
                <DeleteComment
                    commentId={commentId}
                    handleCommentsFetch={handleCommentsFetch}
                    closeModal={closeDeleteModal} 
                />
            )}
        </div>
    );
}

export default Comment;
