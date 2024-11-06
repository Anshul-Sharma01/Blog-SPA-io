import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAuthorProfile } from "../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

function AuthorProfile() {
    const [authorData, setAuthorData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authorId } = useParams();

    useEffect(() => {
        async function fetchAuthorData() {
            const res = await dispatch(fetchAuthorProfile({ authorId }));

            if (res?.payload?.statusCode === 200) {
                setAuthorData(res?.payload?.data?.author);
            } else {
                toast.error("Redirecting to the explore page..");
                navigate("/blogs/all");
                return;
            }
        }
        fetchAuthorData();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="relative flex flex-col items-center mb-8">
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-200 via-yellow-100 to-yellow-50 h-32 w-full rounded-t-xl opacity-70"></div>
                
                <img 
                    className="w-32 h-32 rounded-full border-4 border-white object-cover z-10 mb-4 shadow-md" 
                    src={authorData?.avatar?.secure_url} 
                    alt={`${authorData?.name}'s Avatar`} 
                />
                
                <div className="text-center z-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{authorData?.name}</h2>
                    <p className="text-md font-medium text-gray-600">@{authorData?.username}</p>
                </div>
            </div>

            <div className="space-y-4 text-center">

                <p className="text-lg font-medium text-gray-700">{authorData?.email}</p>
                
                <p className="text-lg font-medium text-gray-700">
                    Blogs Written: <span className="font-semibold text-yellow-600">{authorData?.blogCount}</span>
                </p>
                
                <p className="text-sm text-gray-500">
                    Member Since: <span className="font-medium">{new Date(authorData?.createdAt).toLocaleDateString()}</span>
                </p>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Other Blogs by {authorData?.name}</h3>

                <p className="text-gray-600">No blogs to display yet.</p>
            </div>
        </div>
    );
}

export default AuthorProfile;
