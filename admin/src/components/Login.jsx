import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        const adminToken = response.data.token;

        // ✅ Save token in React state
        setToken(adminToken);

        // ✅ Save token in localStorage for persistence
        localStorage.setItem("adminToken", adminToken);

        // ❌ Clear any user token to avoid conflicts
        localStorage.removeItem("userToken");

        toast.success("Admin login successful!");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-bgLight dark:bg-bgDark transition-colors">
      <div className="bg-bgLight dark:bg-bgDark shadow-md rounded-lg px-8 py-6 max-w-md w-full border border-accent">
        <h1 className="text-2xl font-bold mb-4 text-heading dark:text-textDark">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-textLight dark:text-textDark mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-accent outline-none bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-textLight dark:text-textDark mb-2">
              Password
            </p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-accent outline-none bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-primary hover:bg-accent transition-colors"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
