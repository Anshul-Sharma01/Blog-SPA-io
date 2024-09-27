import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBlogThunk } from "../../Redux/Slices/BlogSlice";

function DeleteBlog({ blogId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function closeModal() {
        document.getElementById('delete_blog_modal').close();
    }

    async function handleDeleteBlog(event) {
        event.preventDefault();
        try {
            const res = await dispatch(deleteBlogThunk({ blogId }));

            if (res?.payload?.statusCode === 200) {
                navigate("/");
                closeModal();
            } else {
                closeModal();
                console.error("Failed to delete blog", res?.payload);
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            
        }
    }

    return (
        <>
            <dialog id="delete_blog_modal" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-6">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <p className="text-center text-lg font-serif text-gray-800 py-4">
                        Are you sure you want to delete the blog permanently?
                    </p>
                    <form onSubmit={handleDeleteBlog} className="flex flex-col gap-4 justify-center items-center">
                        <button className="btn btn-error w-full p-3 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-200" type="submit">
                            Delete Permanently
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default DeleteBlog;
