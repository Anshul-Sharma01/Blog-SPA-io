import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateBlogThunk } from "../../Redux/Slices/BlogSlice";
import { useNavigate } from "react-router-dom";


function UpdateBlogData({ blogId }){

    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleUpdateBlogData(e){
        e.preventDefault();

        if(!title && !content){
            toast.error("At least one field is required");
            return;
        }

        const res =  dispatch(updateBlogThunk({ title, content, blogId }))
        navigate(`/blogs/me`);
        
        closeModal();

        setTitle("");
        setContent("");
    }

    function closeModal(){
        document.getElementById('blog_modal_1').close();
    }

    return(
        <>  
            <dialog id="blog_modal_1" className="modal">
                <div className="modal-box">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <h1 className="text-center text-xl uppercase tracking-wider font-serif font-bold">Update Blog</h1>
                    <form onSubmit={handleUpdateBlogData} className="flex flex-col gap-2 justify-center items-center">
                        <input 
                            type="text" 
                            placeholder="Enter new title"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea 
                            name="content" 
                            placeholder="Enter new content here"
                            className="textarea textarea-bordered w-full"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <button className="btn btn-accent w-full" type="submit">
                            Update Changes
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default UpdateBlogData;


