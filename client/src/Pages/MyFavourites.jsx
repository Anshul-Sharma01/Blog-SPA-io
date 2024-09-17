import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllFavThunk } from "../Redux/Slices/FavouritesSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function MyFavourites(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchFavourites(){
        try{
            const res = await dispatch(getAllFavThunk());
            if(res?.payload?.data.length == 0){
                navigate("/blogs/all");
            }
            console.log("Favourites Response : ", res);
        }catch(err){
            console.log("Error occurred at favourites : ", err);
        }
    }

    useEffect(() => {
        fetchFavourites();
    }, [])

    return(
        <>
            <h1>My Favourites</h1>
        </>
    )
}

export default MyFavourites;

