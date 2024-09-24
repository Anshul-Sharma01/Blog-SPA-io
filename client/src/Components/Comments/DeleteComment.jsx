import { useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../Redux/Slices/CommentSlice.js";

function DeleteComment({ commentId }) {
    const dispatch = useDispatch();

    async function handleDeleteComment(e) {
        e.stopPropogation();
        e.preventDefault();
        const res = await dispatch(deleteCommentThunk({ commentId })); 
    }

    function closeModal(){
        document.getElementById("delete_comment").close();
    }

    return (
        <dialog id="delete_comment" className="modal">
                <div className="modal-box">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <h1 className="text-center text-xl uppercase tracking-wider font-serif font-bold">Are you sure u want to delete this comment ?</h1>
                    <form className="flex flex-col gap-2 justify-center items-center" onSubmit={handleDeleteComment}>

                        <button className="btn btn-accent w-full" type="submit">
                            Delete Comment
                        </button>
                    </form>
                </div>
        </dialog>
    );
}

export default DeleteComment;
