import { useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../Redux/Slices/CommentSlice.js";

function DeleteComment({ commentId, handleCommentsFetch, closeModal }) {
    const dispatch = useDispatch();

    async function handleDeleteComment(e) {
        e.preventDefault();
        console.log("Delete Comment Button Clicked");

        try {
            const res = await dispatch(deleteCommentThunk({ commentId }));
            if (res?.payload?.success) {
                console.log("Comment deleted successfully");
                handleCommentsFetch(); 
                closeModal(); 
            } else {
                console.error("Failed to delete comment:", res?.payload?.message);
            }
        } catch (error) {
            console.error("Error while deleting comment:", error);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
            <div className="bg-white rounded-lg p-6 shadow-lg relative">
                <button 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-800 transition-colors"
                    onClick={closeModal}
                >
                    ✕
                </button>
                <h1 className="text-center text-2xl uppercase tracking-wider font-serif font-bold text-gray-800 mb-4">
                    Are you sure?
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    This action cannot be undone. Please confirm if you want to delete this comment.
                </p>
                <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleDeleteComment}>
                    <button 
                        className="btn bg-red-500 hover:bg-red-600 text-white w-full rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
                        type="submit"
                    >
                        Delete Comment
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
        </div>
    );
}

export default DeleteComment;
