import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

function Dashboard({ totalCountData }) {
    const user = useSelector((state) => state?.auth?.userData);
    const [userData, setUserData] = useState(user);

    const pieChartData = {
        labels: ["Users", "Comments"],
        datasets: [
        {
            data: [totalCountData?.totalUsers, totalCountData?.totalComments],
            backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        },
        ],
    };

    useEffect(() => {
        setUserData(user);
    }, [user]);

    return (
        <main className="flex flex-col gap-8 bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-gray-800">Admin Dashboard</h1>

            <div className="flex gap-6 justify-center items-center shadow-lg p-6 w-[400px] rounded-3xl bg-white border border-gray-300">
                <img
                src={userData?.avatar?.secure_url}
                alt="Admin Avatar"
                className="rounded-full h-24 w-24 border-4 border-indigo-500 transition-transform transform hover:scale-110"
                />
                <aside className="flex flex-col gap-2 justify-center items-center">
                {["name", "username", "email"].map((field) => (
                    <input
                    key={field}
                    type="text"
                    value={userData?.[field]}
                    className="text-center bg-slate-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled
                    />
                ))}
                </aside>
            </div>

            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Additional Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Posts", value: totalCountData?.totalPosts },
                    { label: "Total Users", value: totalCountData?.totalUsers },
                    { label: "Total Comments", value: totalCountData?.totalComments },
                    { label: "Total Likes", value: totalCountData?.totalLikes },
                ].map((stat) => (
                    <div key={stat.label} className="p-4 bg-white shadow-md rounded-lg">
                    <h3 className="font-bold text-lg">{stat.label}</h3>
                    <p className="text-xl text-indigo-600">{stat.value}</p>
                    </div>
                ))}
                </div>
            </section>

            <section className="mt-8 flex flex-col items-center gap-2 justify-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Graphical Analysis</h2>
                <div className="bg-white shadow-md rounded-lg p-4 w-1/2">
                <h3 className="font-bold text-lg text-center">User vs Comments</h3>
                <Pie data={pieChartData}/>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
