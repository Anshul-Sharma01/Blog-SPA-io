

function BlogSkeleton(){
    return(
        <>
            <div className="flex w-96 h-96 flex-col gap-4 ">
                <div className="flex items-center gap-4 w-full">
                    <div className="skeleton h-16  w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-10 w-full"></div>
                    </div>
                </div>
                <div className="skeleton h-96 w-full"></div>
            </div>
        </>
    )
}

export default BlogSkeleton;



