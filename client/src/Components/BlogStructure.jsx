import { BiLike } from "react-icons/bi";
import { LuUser2 } from "react-icons/lu";

function BlogStructure({ thumbnail, title, numberOfLikes, author }){
    return(
        <>
            <div className="w-[450px] rounded-lg border shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                    src={thumbnail}
                    alt="Blog Thumbnail"
                    className="h-[200px] w-full rounded-t-lg object-cover"
                />
                <div className="p-6">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <div className="flex items-center justify-between mt-4 text-gray-600">
                        <div className="flex flex-row justify-center items-center">
                            <BiLike className="text-2xl mr-2" />
                            <span className="text-lg">{numberOfLikes}</span>
                        </div>
                        {
                            author && (
                                <div className="flex flex-row justify-center items-center gap-2">
                                    <LuUser2 className="text-2xl font-bold"/>
                                    <span className="text-sm font-bold font-serif uppercase">{author}</span>
                                </div>
                            )
                        }
                    </div>
                    <button
                        type="button"
                        className="mt-4 w-full rounded-md btn  px-4 py-2 text-sm font-medium text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 btn-accent"
                    >
                        Read More
                    </button>
                </div>
            </div>
        </>
    )
}


export default BlogStructure;

