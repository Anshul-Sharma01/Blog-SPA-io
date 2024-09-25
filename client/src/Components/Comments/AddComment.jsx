import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCommentThunk } from "../../Redux/Slices/CommentSlice";

function AddComment({ blogId, handleCommentsFetch }) {
    const dispatch = useDispatch();
    const [blogContent, setBlogContent] = useState("");

    function closeModal() {
        document.getElementById("comment_modal").close();
    }

    async function handleAddComment(e) {
        e.preventDefault();

        const res = await dispatch(addCommentThunk({ blogId, content: blogContent }));
        console.log("Comment thunk response:", res);

        if (res?.payload?.success) {
            handleCommentsFetch();
        }

        closeModal();
        setBlogContent('');
    }

    return (
        <>
            <dialog id="comment_modal" className="modal backdrop-blur-sm bg-black/30">
                <div className="modal-box bg-white rounded-lg p-6 shadow-lg relative">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-800 transition-colors"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <h1 className="text-center text-2xl uppercase tracking-wider font-serif font-bold text-gray-800 mb-4">
                        Add Comment
                    </h1>
                    <p className="text-center text-gray-600 mb-4">
                        Share your thoughts about this blog.
                    </p>
                    <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleAddComment}>
                        <textarea
                            name="content" 
                            placeholder="Enter new comment here"
                            className="textarea textarea-bordered w-full h-24 rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                            value={blogContent}
                            onChange={(e) => setBlogContent(e.target.value)}
                        />
                        <button 
                            className="btn bg-blue-500 hover:bg-blue-600 text-white w-full rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
                            type="submit"
                        >
                            Add Comment
                        </button>
                        <button 
                            type="button"
                            className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 w-full rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default AddComment;
