import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateBlogThunk } from "../../Redux/Slices/BlogSlice";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";

function UpdateBlogData({ blogId, blogData }) {
    const [title, setTitle] = useState(blogData?.title || "");
    const [content, setContent] = useState(blogData?.content || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleUpdateBlogData(e) {
        e.preventDefault();

        if (!title && !content) {
            toast.error("At least one field is required");
            return;
        }
        
        const sanitizedContent = DOMPurify.sanitize(content);

        await dispatch(updateBlogThunk({ title, content : sanitizedContent, blogId }));
        navigate(`/blogs/me`);
        closeModal();
        setTitle("");
        setContent("");
    }

    function closeModal() {
        document.getElementById('blog_modal_1').close();
    }

    return (
        <>  
            <dialog id="blog_modal_1" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-6">
                    <button 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
                        Update Blog
                    </h1>
                    <form onSubmit={handleUpdateBlogData} className="flex flex-col gap-4">
                        <input 
                            type="text" 
                            placeholder="Enter new title"
                            className="input input-bordered w-full p-3 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <CKEditor 
                            editor={ClassicEditor} 
                            data = { content }
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                        />
                        <button className="btn btn-accent w-full p-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200" type="submit">
                            Update Changes
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default UpdateBlogData;
