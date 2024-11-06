import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedUser, fetchAllUsers } from "../../Redux/Slices/AdminSlice";
import { useEffect, useState } from "react";

function Users() {
    const dispatch = useDispatch();
    const [ allUsers, setAllUsers ] = useState();

    const fetchUsers = async () => {
        const response = await dispatch(fetchAllUsers());
        setAllUsers(response?.payload?.data);
        // console.log(response);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const res = await dispatch(deleteSelectedUser({userId}));
        console.log(res);
    };

    const handleUpdateRole = (userId) => {
        console.log(`Update role for user with ID: ${userId}`);
    };

    return (
        <main className="flex flex-col gap-8 bg-gray-100 p-4">
            <div className="grid grid-cols-3 gap-4">
                {allUsers?.map((user) => (
                <div key={user._id} className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
                    <img
                    src={user?.avatar?.secure_url || "https://via.placeholder.com/100"} 
                    alt={user.name}
                    className="h-36 w-36 object-cover rounded-full mb-4"
                    />
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p>{user.email}</p>
                    <p>Blogs: {user.blogCount}</p>
                    <p>Role: {user.role}</p>

                    <div className="flex gap-4 mt-4">
                    <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                        Delete User
                    </button>
                    <button
                        onClick={() => handleUpdateRole(user._id)}
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                        Update Role
                    </button>
                    </div>
                </div>
                ))}
            </div>
        </main>
    );
}

export default Users;
