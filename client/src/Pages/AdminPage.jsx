import { useState, useEffect } from "react";

function AdminPage() {
  const [activeSection, setActiveSection] = useState("Dashboard");

  useEffect(() => {
    
    const root = document.getElementById("root");
    const originalPadding = root.style.padding;
    const originalMargin = root.style.margin;
    const originalMaxWidth = root.style.maxWidth;
    const originalTextAlign = root.style.textAlign;

    
    root.style.padding = "0";
    root.style.margin = "0";
    root.style.maxWidth = "100%";
    root.style.textAlign = "center";

    return () => {
      
      root.style.padding = originalPadding;
      root.style.margin = originalMargin;
      root.style.maxWidth = originalMaxWidth;
      root.style.textAlign = originalTextAlign;
    };
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h1 className="text-2xl font-semibold">Dashboard</h1>;
      case "Posts":
        return <h1 className="text-2xl font-semibold">Posts</h1>;
      case "Users":
        return <h1 className="text-2xl font-semibold">Users</h1>;
      case "Comments":
        return <h1 className="text-2xl font-semibold">Comments</h1>;
      case "Analytics":
        return <h1 className="text-2xl font-semibold">Analytics</h1>;
      case "Settings":
        return <h1 className="text-2xl font-semibold">Settings</h1>;
      default:
        return <h1 className="text-2xl font-semibold">Dashboard</h1>;
    }
  };

  return (
    <div className="flex h-[100vh] w-[100vw] bg-gray-200">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4">
          <h2 className="text-lg font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <button
                onClick={() => setActiveSection("Dashboard")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Posts")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Posts
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Users")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Comments")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Comments
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Analytics")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Settings")}
                className="w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        {renderSection()}
      </main>
    </div>
  );
}

export default AdminPage;
