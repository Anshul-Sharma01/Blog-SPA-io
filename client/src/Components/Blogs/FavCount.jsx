import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFavCountThunk } from "../../Redux/Slices/FavouritesSlice";

function FavCount({ blogId }){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function closeModal(){
        document.getElementById('favCount_modal').close();
    }


    async function fetchFavcount(e){
        e.preventDefault();
        try{
            const res = await dispatch(getFavCountThunk({ blogId }));
            console.log("Res : ", res);

            closeModal();

        }catch(err){
            console.error("Error deleting blog : ", err);
        }
    }



    return(
        <>
            <dialog id="favCount_modal" className="modal">
                <div className="modal-box">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <p className="text-center text-md font-serif  p-8">Click the button below to fetch the Favourites count for your blog</p>
                    <form onSubmit={fetchFavcount} className="flex flex-col gap-2 justify-center items-center">
                        <button className="btn btn-error w-full" type="submit">
                            Fetch Favourite Count
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}


export default FavCount;

