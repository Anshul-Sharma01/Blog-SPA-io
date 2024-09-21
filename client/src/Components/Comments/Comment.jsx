import { BiLike } from "react-icons/bi";


function Comment({ imgSrc,  ownerName, content = "Good Blog", totalLikes = 0 }){
    return(
        <>
            <article className="max-w-2xl px-6 py-24 mx-auto space-y-12 ">
                <div className="pt-12 border-t">
                    <div className="flex flex-col h-fit space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                        <img src={imgSrc || "https://source.unsplash.com/75x75/?portrait"} alt="" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start " />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-semibold">{ownerName || "John Doe"}</h4>
                            <p className="">{content || "Unable to fetch..."}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center pl-20">
                            <BiLike className="text-2xl text-blue-600" />
                            <span className="text-lg font-semibold">{totalLikes}</span>
                        </div>
                    </div>

                </div>
            </article>
        </>
    )
}


export default Comment;