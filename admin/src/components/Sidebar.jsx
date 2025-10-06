import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const linkClasses =
    "flex items-center gap-3 px-3 py-2 rounded-l transition-colors border-l-4 border-transparent";
  const baseColors =
    "text-textLight dark:text-textDark hover:bg-accent/20 hover:border-accent";

  return (
    <div className="w-[18%] min-h-screen border-r border-accent/40 dark:border-accent/30 bg-bgLight dark:bg-bgDark transition-colors">
      <div className="flex flex-col gap-2 pt-6 pl-[15%] text-[15px]">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClasses} ${baseColors} ${
              isActive ? "bg-accent/30 border-primary text-primary font-semibold" : ""
            }`
          }
        >
          <img
            className="w-5 h-5"
            src={assets.dashboard || assets.order}
            alt=""
          />
          <p className="hidden md:block">Dashboard</p>
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `${linkClasses} ${baseColors} ${
              isActive ? "bg-accent/30 border-primary text-primary font-semibold" : ""
            }`
          }
        >
          <img className="w-5 h-5" src={assets.add} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `${linkClasses} ${baseColors} ${
              isActive ? "bg-accent/30 border-primary text-primary font-semibold" : ""
            }`
          }
        >
          <img className="w-5 h-5" src={assets.upload} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `${linkClasses} ${baseColors} ${
              isActive ? "bg-accent/30 border-primary text-primary font-semibold" : ""
            }`
          }
        >
          <img className="w-5 h-5" src={assets.order} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <NavLink
          to="/voucher"
          className={({ isActive }) =>
            `${linkClasses} ${baseColors} ${
              isActive ? "bg-accent/30 border-primary text-primary font-semibold" : ""
            }`
          }
        >
          <img className="w-5 h-5" src={assets.voucher || assets.add} alt="" />
          <p className="hidden md:block">Vouchers</p>
        </NavLink>

        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `${linkClasses} ${baseColors} ${
              isActive ? "bg-accent/30 border-primary text-primary font-semibold" : ""
            }`
          }
        >
          <img className="w-5 h-5" src={assets.user || assets.order} alt="" />
          <p className="hidden md:block">Customers</p>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkClasses} ${baseColors} ${
              isActive ? "bg-accent/30 border-primary text-primary font-semibold" : ""
            }`
          }
        >
          <img className="w-5 h-5" src={assets.settings || assets.add} alt="" />
          <p className="hidden md:block">Settings</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
