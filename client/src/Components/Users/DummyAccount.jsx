import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount, LoginUser } from "../../Redux/Slices/AuthSlice";

function DummyAccount(){

    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handleDummyAccount(e){
        e.preventDefault();
        const email = "dummy@gmail.com";
        const password = "dummyUser@123";

        const res = await dispatch(LoginUser({email, password}));
        if(res.payload.statusCode === 200){
            navigate("/");
        }
    }

    return(
        <>
            <Link className="link text-ghost py-4 cursor-pointer">
                <button onClick={handleDummyAccount}>
                    Click Here for a dummy Account
                </button>
            </Link> 
        </>
    )
}


export default DummyAccount;

