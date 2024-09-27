import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFavCountThunk } from "../../Redux/Slices/FavouritesSlice";

function FavCount({ blogId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function closeModal() {
        document.getElementById('favCount_modal').close();
    }

    async function fetchFavcount(e) {
        e.preventDefault();
        try {
            const res = await dispatch(getFavCountThunk({ blogId }));
            console.log("Res : ", res);

            closeModal();
        } catch (err) {
            console.error("Error fetching favourite count: ", err);
        }
    }

    return (
        <>
            <dialog id="favCount_modal" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-6">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <p className="text-center text-lg font-serif text-gray-800 py-4">
                        Click the button below to fetch the Favourites count for your blog
                    </p>
                    <form onSubmit={fetchFavcount} className="flex flex-col gap-4 justify-center items-center">
                        <button className="btn btn-accent w-full p-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200" type="submit">
                            Fetch Favourite Count
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default FavCount;
