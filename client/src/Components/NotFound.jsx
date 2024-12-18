import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function NotFound(){

    const navigate = useNavigate();

    return (
        <section className="flex justify-center items-center h-[100vh]">
            <div className="py-10">
                <div className="text-center">
                    <p className="text-xl font-semibold text-black ">404</p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
                    Page not found
                    </h1>
                    <p className="mt-4 text-lg leading-7 text-gray-600">
                    Sorry, we couldn't find the page you&#x27;re looking for.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-x-3">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={() => navigate(-1)}
                        >
                            <BsArrowLeft/> &nbsp;
                            Go back
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Home
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}


export default NotFound;
