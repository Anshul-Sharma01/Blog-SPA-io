import { useState, useEffect } from "react";
import Dashboard from "../Components/Admin/Dashboard";
import { useDispatch } from "react-redux";
import { fetchTotalCount } from "../Redux/Slices/AdminSlice";
import Users from "../Components/Admin/Users";

function AdminPage() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [totalCountData, setTotalCountData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const root = document.getElementById("root");
    const originalStyles = {
      padding: root.style.padding,
      margin: root.style.margin,
      maxWidth: root.style.maxWidth,
      textAlign: root.style.textAlign,
    };

    root.style.padding = "0";
    root.style.margin = "0";
    root.style.maxWidth = "100%";
    root.style.textAlign = "center";

    return () => {
      root.style.padding = originalStyles.padding;
      root.style.margin = originalStyles.margin;
      root.style.maxWidth = originalStyles.maxWidth;
      root.style.textAlign = originalStyles.textAlign;
    };
  }, []);

  const fetchCount = async () => {
    const response = await dispatch(fetchTotalCount());
    setTotalCountData(response?.payload?.data);
  };

  useEffect(() => {
    fetchCount();
  }, [dispatch]);

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard totalCountData={totalCountData} />;
      case "Users":
        return <Users />;
      case "Posts":
        return <h1 className="text-2xl font-semibold">Posts</h1>;
      case "Comments":
        return <h1 className="text-2xl font-semibold">Comments</h1>;
      case "Analytics":
        return <h1 className="text-2xl font-semibold">Analytics</h1>;
      default:
        return <h1 className="text-2xl font-semibold">Dashboard</h1>;
    }
  };

  return (
    <div className="flex gap-2 bg-gray-200">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4">
          <h2 className="text-lg font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <ul>
            {["Dashboard", "Users", "Posts", "Comments", "Analytics"].map(
              (section) => (
                <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    {section}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 min-h-screen">
        {renderSection()}
      </main>
    </div>
  );
}

export default AdminPage;
