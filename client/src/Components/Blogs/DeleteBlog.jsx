import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBlogThunk } from "../../Redux/Slices/BlogSlice";


function DeleteBlog({ blogId }){

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
            // Optionally show an error message to the user
        }
    }




    return(
        <>
            <dialog id="delete_blog_modal" className="modal">
                <div className="modal-box">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <p className="text-center text-md font-serif  p-8">Are u sure u want to delete the blog permanently ? </p>
                    <form onSubmit={handleDeleteBlog} className="flex flex-col gap-2 justify-center items-center">
                        <button className="btn btn-error w-full" type="submit">
                            Delete Permanently
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}


export default DeleteBlog;

