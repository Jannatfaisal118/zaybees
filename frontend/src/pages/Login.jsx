import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { LanguageContext } from "../context/LanguageContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const { t } = useContext(LanguageContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 
                 text-textLight dark:text-textDark 
                 bg-bgLight dark:bg-bgDark 
                 p-6 rounded-md shadow-md border border-accent dark:border-primary"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{t(currentState.toLowerCase())}</p>
        <hr className="border-none h-[1.5px] w-8 bg-accent dark:bg-primary" />
      </div>

      {/* Name field (Sign Up only) */}
      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-accent dark:border-primary 
                     bg-bgLight dark:bg-bgDark 
                     text-textLight dark:text-textDark 
                     placeholder-subtext dark:placeholder-primary"
          placeholder={t("name")}
          required
        />
      )}

      {/* Email */}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-accent dark:border-primary 
                   bg-bgLight dark:bg-bgDark 
                   text-textLight dark:text-textDark 
                   placeholder-subtext dark:placeholder-primary"
        placeholder={t("email")}
        required
      />

      {/* Password */}
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-accent dark:border-primary 
                   bg-bgLight dark:bg-bgDark 
                   text-textLight dark:text-textDark 
                   placeholder-subtext dark:placeholder-primary"
        placeholder={t("password")}
        required
      />

      {/* Links */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer hover:text-accent">{t("forgotPassword")}</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:text-accent"
          >
            {t("createAccount")}
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:text-accent"
          >
            {t("loginHere")}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        className="bg-accent dark:bg-primary 
                   text-bgLight dark:text-bgDark 
                   font-light px-8 py-2 mt-4 hover:opacity-90 transition"
      >
        {currentState === "Login" ? t("signIn") : t("signUp")}
      </button>
    </form>
  );
};

export default Login;
