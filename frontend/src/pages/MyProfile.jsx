import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { LanguageContext } from "../context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";
import OrderHistory from "../components/OrderHistory";
import SettingsTab from "../components/SettingsTab";

const MyProfile = () => {
  const { t } = useContext(LanguageContext);
  const { token, backendUrl, setToken, setCartItems, removeFromWishlist } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile, wishlist & orders together
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [profileRes, wishlistRes, ordersRes] = await Promise.all([
          axios.get(`${backendUrl}/api/user/profile`, { headers }),
          axios.get(`${backendUrl}/api/user/wishlist`, { headers }),
          axios.post(`${backendUrl}/api/order/userorders`, {}, { headers }),
        ]);

        const profile = profileRes.data;
        setUser(profile);
        setFormData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          address: profile.address || "",
        });

        setWishlist(wishlistRes.data || []);

        if (ordersRes.data.success) {
          setOrders(
            ordersRes.data.orders.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )
          );
        }
      } catch (err) {
        if (err.response) {
          console.error("Error status:", err.response.status);
          console.error("Error data:", err.response.data);
        } else {
          console.error("Request failed:", err.message);
        }
        setError(t("failed_to_load"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, backendUrl, t]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(data);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert(t("profile_update_failed"));
    }
  };

  const handleRemove = async (productId) => {
    if (!token) return alert(t("login_required"));
    await removeFromWishlist(productId); // updates wishlist in context
    // Also update local wishlist state in this component
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  };

  const handleRemovePayment = (id) => {
  // Logic to remove payment method from user
  console.log("Remove payment method:", id);
};


  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) return alert(t("password_too_short"));
    if (passwords.newPassword !== passwords.confirmPassword)
      return alert(t("passwords_do_not_match"));

    try {
      await axios.put(
        `${backendUrl}/api/user/change-password`,
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(t("password_updated"));
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      alert(t("password_update_failed"));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-subtext dark:text-accent">
        {t("loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="pt-16 px-4 md:px-8 bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="
    w-full md:w-1/4 
    p-6 
    rounded-xl 
    shadow-md 
    flex flex-col gap-4
    bg-bgLight dark:bg-bgDark
    md:sticky md:top-24
  ">
          <p className="mt-2 underline text-lg text-center font-bold font-serif text-amber-300">
            {user.name}
          </p>

          {/* Tabs */}
          {["profile", "orders", "wishlist", "settings"].map((tab) => (
            <button
              key={tab}
              className={`text-left p-2 rounded-md ${
                activeTab === tab
                  ? "bg-accent text-white dark:text-black"
                  : "text-white dark:text-white hover:bg-accent hover:text-gray-200 dark:hover:text-gray-200 dark:hover:bg-accent"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {t(
                tab === "profile"
                  ? "profile_info"
                  : tab === "orders"
                  ? "order_history"
                  : tab
              )}
            </button>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            {t("logout")}
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 flex flex-col gap-6">
          {/* Profile Info */}
          {activeTab === "profile" && (
            <div className="bg-bgLight dark:bg-bgDark p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-heading dark:text-textDark">
                  {t("profile_info")}
                </h3>

                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <img src={assets.edit} alt="Edit" className="w-4 h-4" />
                  {editMode ? t("cancel") : t("edit")}
                </button>
              </div>

              {editMode ? (
                <form
                  onSubmit={handleUpdateProfile}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    placeholder={t("name")}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="p-2 border rounded-md dark:bg-bgDark dark:border-accent dark:text-textDark"
                  />
                  <input
                    type="email"
                    placeholder={t("email")}
                    value={formData.email}
                    readOnly
                    className="p-2 border rounded-md bg-gray-100 dark:bg-bgDark dark:border-accent dark:text-textDark"
                  />
                  <input
                    type="text"
                    placeholder={t("phone")}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="p-2 border rounded-md dark:bg-bgDark dark:border-accent dark:text-textDark"
                  />
                  <input
                    type="text"
                    placeholder={t("address")}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="p-2 border rounded-md dark:bg-bgDark dark:border-accent dark:text-textDark"
                  />
                  <button
                    type="submit"
                    className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90"
                  >
                    {t("save_changes")}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col gap-2 text-subtext dark:text-accent">
                  <p>
                    <strong>{t("name")}:</strong> {user.name}
                  </p>
                  <p>
                    <strong>{t("email")}:</strong> {user.email}
                  </p>
                  <p>
                    <strong>{t("phone")}:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>{t("address")}:</strong> {user.address || "-"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" &&
            (orders.length > 0 ? (
              <OrderHistory
                ordersData={orders}
                token={token}
                backendUrl={backendUrl}
                t={t}
              />
            ) : (
              <div className="bg-bgLight dark:bg-bgDark p-6 rounded-xl shadow-md">
                <p className="text-subtext dark:text-accent">
                  {t("no_orders")}
                </p>
              </div>
            ))}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <div className="bg-bgLight dark:bg-bgDark p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-heading dark:text-textDark">
                {t("wishlist")}
              </h3>
              {wishlist.length === 0 ? (
                <p className="text-subtext dark:text-accent">
                  {t("wishlist_empty")}
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {wishlist.map((item) => (
                    <li
                      key={item._id}
                      className="p-4 border rounded-md dark:border-accent flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-accent hover:underline"
                        >
                          {t("view_product")}
                        </Link>
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-red-500 hover:underline bg-transparent"
                        > <img className="w-4 h-4" src={assets.cross_icon} alt="Remove item" />
                          {/* {t("remove")} */}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <SettingsTab
              t={t}
              handleChangePassword={handleChangePassword}
              passwords={passwords}
              setPasswords={setPasswords}
              handleRemovePayment={handleRemovePayment}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
