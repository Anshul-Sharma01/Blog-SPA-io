import { LiaCommentsSolid } from "react-icons/lia";

import { useState } from "react";
import Comment from "./Comment";


function Comments(){

    const [ commentsData, setCommentsData ] = useState([]);

    return(
        <>
            <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
                <div className="collapse-title text-xl font-medium flex flex-row justify-center items-center gap-10">Click here to view Comments <LiaCommentsSolid/></div>
                <div className="collapse-content">
                    {
                        commentsData.length == 0 ? ( <h3>No Comments Yet</h3> )  : (
                            <>
                                <Comment />
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Comments;


