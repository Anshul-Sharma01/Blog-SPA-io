import { useState } from "react";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
    const user = useSelector((state) => state?.auth?.userData);
    const [userData, setUserData] = useState(user);


    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Posts',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const pieChartData = {
        labels: ['Users', 'Comments'],
        datasets: [
            {
                data: [100, 150],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            },
        ],
    };

    return (
        <main className="flex flex-col gap-8 bg-gray-100 ">
            <h1 className="text-4xl font-bold text-center text-gray-800">Admin Dashboard</h1>
            <div className="flex gap-6 justify-center items-center shadow-lg p-6 w-[400px] rounded-3xl bg-white border border-gray-300">
                <img
                    src={userData?.avatar?.secure_url}
                    alt="Admin Avatar"
                    className="rounded-full h-24 w-24 border-4 border-indigo-500 transition-transform transform hover:scale-110"
                />
                <aside className="flex flex-col gap-2 justify-center items-center">
                    <input
                        type="text"
                        value={userData?.name}
                        className="text-center bg-slate-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled
                    />
                    <input
                        type="text"
                        value={userData?.username}
                        className="text-center bg-slate-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled
                    />
                    <input
                        type="text"
                        value={userData?.email}
                        className="text-center bg-slate-200 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled
                    />
                </aside>
            </div>
            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Additional Information</h2>
                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="font-bold text-lg">Total Posts</h3>
                        <p className="text-xl text-indigo-600">25</p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="font-bold text-lg">Total Users</h3>
                        <p className="text-xl text-indigo-600">100</p>
                    </div>
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="font-bold text-lg">Total Comments</h3>
                        <p className="text-xl text-indigo-600">150</p>
                    </div>
                </div>
            </section>
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Charts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-bold text-lg text-center">Posts by Month</h3>
                        <Bar data={barChartData} />
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-bold text-lg text-center">User vs Comments</h3>
                        <Pie data={pieChartData} />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
