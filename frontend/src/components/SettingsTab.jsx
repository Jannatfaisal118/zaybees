import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // icons
import { assets } from "../assets/assets";

const SettingsTab = ({ t, handleChangePassword, passwords, setPasswords }) => {
  const [showPayments, setShowPayments] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="bg-bgLight dark:bg-bgDark p-6 rounded-2xl shadow-lg max-w-2xl space-y-6">
      <h3 className="text-2xl font-semibold text-heading dark:text-textDark">
        {t("account_settings")}
      </h3>

      {/* Collapsible: Notifications */}
      <div className="bg-white/5 dark:bg-black/20 p-4 rounded-lg shadow-sm">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="flex justify-between items-center w-full text-left text-lg font-semibold text-heading dark:text-textDark bg-transparent border-0 shadow-none focus:outline-none"
        >
          {t("notifications")}
          {showNotifications ? <ChevronUp /> : <ChevronDown />}
        </button>

        {showNotifications && (
          <div className="mt-4 flex flex-col gap-2 animate-fadeIn">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-accent" /> {t("email_notifications")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-accent" /> {t("sms_notifications")}
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-accent" /> {t("offers_promotions")}
            </label>
          </div>
        )}
      </div>

      {/* Collapsible: Payments */}
      <div className="bg-white/70 dark:bg-black/20 p-4 rounded-xl shadow-sm">
        <button
          onClick={() => setShowPayments(!showPayments)}
          className="flex justify-between items-center w-full text-left text-lg font-semibold text-heading dark:text-textDark bg-transparent border-0 shadow-none focus:outline-none"
        >
          {t("payment_methods")}
          {showPayments ? <ChevronUp /> : <ChevronDown />}
        </button>
        {showPayments && (
          <div className="mt-4 flex flex-col gap-3 animate-fadeIn">
            <div className="flex justify-between items-center p-3 border rounded-lg dark:border-accent">
  <span>Visa •••• 4242</span>
  <div
  className="flex items-center gap-1 cursor-pointer text-red-500"
  
>
  <img src={assets.cross_icon} alt="Clear" className="w-4 h-4" />
  
</div>

</div>

            <button className="bg-accent text-white px-4 py-2 rounded-lg shadow-md hover:bg-accent/90 active:scale-95 transition">
              {t("add_payment_method")}
            </button>
          </div>
        )}
      </div>

      {/* Collapsible: Password */}
      <div className="bg-white/70 dark:bg-black/20 p-4 rounded-xl shadow-sm">
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="flex justify-between items-center w-full text-left text-lg font-semibold text-heading dark:text-textDark bg-transparent border-0 shadow-none focus:outline-none"
        >
          {t("change_password")}
          {showPassword ? <ChevronUp /> : <ChevronDown />}
        </button>
        {showPassword && (
          <form
            onSubmit={handleChangePassword}
            className="mt-4 flex flex-col gap-4 animate-fadeIn">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <input
                key={field}
                type="password"
                placeholder={t(field)}
                value={passwords[field]}
                onChange={(e) =>
                  setPasswords({ ...passwords, [field]: e.target.value })
                }
                className="p-2 border rounded-lg dark:bg-bgDark dark:border-accent dark:text-textDark focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            ))}
            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded-lg shadow-md hover:bg-accent/90 active:scale-95 transition"
            >
              {t("update_password")}
            </button>
          </form>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-white/70 dark:bg-black/20 p-4 rounded-xl shadow-sm">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 active:scale-95 transition">
          {t("delete_account")}
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
