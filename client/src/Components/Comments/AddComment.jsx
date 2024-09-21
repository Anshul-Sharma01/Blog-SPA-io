import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



function AddComment({ blogId }){

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [ blogContent, setBlogContent ] = useState();

    function closeModal(){
        document.getElementById("comment_modal").close();
    }

    return(
        <>
            <dialog id="comment_modal" className="modal">
                <div className="modal-box">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <h1 className="text-center text-xl uppercase tracking-wider font-serif font-bold">Add Comment</h1>
                    <form  className="flex flex-col gap-2 justify-center items-center">
                        <textarea 
                            name="content" 
                            placeholder="Enter new content here"
                            className="textarea textarea-bordered w-full"
                            value={blogContent}
                            onChange={(e) => setBlogContent(e.target.value)}
                        />
                        <button className="btn btn-accent w-full" type="submit">
                            Add a new Blog
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default AddComment;
