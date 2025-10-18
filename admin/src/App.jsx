import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Orders from "./pages/Orders";
import List from "./pages/List";
import Add from "./pages/Add";
import Login from "./components/Login";
import Voucher from "./pages/Voucher";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = "https://zaybees-backend.onrender.com";
// export const backendUrl = "https://zaybees-backend.vercel.app/";
export const currency = "Rs. ";

const App = () => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || ""
  );

  useEffect(() => {
    localStorage.setItem("adminToken", adminToken);
  }, [adminToken]);

  return (
    // Apply global theme-aware background & text
    <div className="bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark min-h-screen transition-colors">
      <ToastContainer />
      {adminToken === "" ? (
        <Login setToken={setAdminToken} />
      ) : (
        <>
          <Navbar setToken={setAdminToken} />
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/add" element={<Add token={adminToken} />} />
                <Route path="/list" element={<List token={adminToken} />} />
                <Route path="/orders" element={<Orders token={adminToken} />} />
                <Route
                  path="/voucher"
                  element={<Voucher token={adminToken} />}
                />
                <Route
                  path="/customers"
                  element={<Customers token={adminToken} />}
                />
                <Route
                  path="/dashboard"
                  element={<Dashboard token={adminToken} />}
                />
                <Route
                  path="/settings"
                  element={<Settings token={adminToken} />}
                />
                <Route
                  path="*"
                  element={
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold text-heading dark:text-textDark">
                          404 - Page Not Found
                        </h1>
                        <p className="text-subtext dark:text-textDark">
                          The path <code>{window.location.pathname}</code> doesn&apos;t exist.
                        </p>
                        <NavLink
                          to="/"
                          className="mt-4 inline-block px-4 py-2 bg-primary hover:bg-accent text-white rounded transition-colors"
                        >
                          Go to Dashboard
                        </NavLink>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
