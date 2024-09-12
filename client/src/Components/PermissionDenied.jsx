import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { FaLock } from "react-icons/fa";

function PermissionDenied() {
    const navigate = useNavigate();

    return (
        <section className="flex justify-center items-center h-[100vh] bg-gray-100">
            <div className="py-10 px-5 bg-white shadow-lg rounded-lg">
                <div className="text-center">
                    <FaLock className="text-6xl text-red-500 mx-auto" />
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
                        Permission Denied
                    </h1>
                    <p className="mt-4 text-lg leading-7 text-gray-600">
                        You do not have the required permissions to view this page.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-x-3">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={() => navigate(-1)}
                        >
                            <BsArrowLeft /> &nbsp;
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
    );
}

export default PermissionDenied;
