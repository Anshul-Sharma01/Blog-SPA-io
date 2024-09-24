import { BiLike } from "react-icons/bi";

function Comment({ imgSrc, ownerName, content = "Good Blog", totalLikes = 0 }) {
    return (
        <>
            <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 max-w-2xl mx-auto">
                <div className="flex items-start space-x-4">
                    <img
                        src={imgSrc}
                        alt="User"
                        className="w-16 h-16 rounded-full border border-gray-300 object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-gray-900">{ownerName || "John Doe"}</h4>
                            <div className="flex items-center space-x-1">
                                <BiLike className="text-2xl text-blue-600 cursor-pointer hover:text-blue-800" />
                                <span className="text-lg font-semibold text-gray-700">{totalLikes}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 mt-2 text-base leading-relaxed">{content || "Unable to fetch..."}</p>
                    </div>
                </div>
            </article>
        </>
    );
}

export default Comment;
