import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAllFavThunk } from "../../Redux/Slices/FavouritesSlice.js";

function ClearAllFav(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function closeModal(){
        document.getElementById("clearFav_modal").close();
    }

    async function clearAllFav(e){
        e.preventDefault(); 
        try{
            const res = await dispatch(clearAllFavThunk());
            closeModal();
            navigate("/");
        }catch(err){    
            console.error("Error removing favourites : ", err);
        }
    }

    return(
        <>
            <dialog id="clearFav_modal" className="modal">
                <div className="modal-box">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <p className="text-center text-md font-serif  p-8">Click the button below to remove all the Favourites</p>
                    <form onSubmit={clearAllFav} className="flex flex-col gap-2 justify-center items-center">
                        <button className="btn btn-error w-full" type="submit">
                            Clear all Favourites
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )

}


export default ClearAllFav;

