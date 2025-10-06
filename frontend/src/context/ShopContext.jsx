import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShopContext = createContext();
export { ShopContext };

const ShopContextProvider = (props) => {

  const delivery_fee = 100;
//   const backendUrl = "http://localhost:4000";
          const backendUrl = "https://zaybees-backend.vercel.app/";
  const MIN_VOUCHER_AMOUNT = 500;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");        // user token
const [adminToken, setAdminToken] = useState(""); // admin token
const [wishlist, setWishlist] = useState([]); // wishlist items

// ------------------- Country & Currency -------------------
  const countryCurrencyMap = {
    PK: { currency: "PKR", symbol: "₨", rate: 1 },
    US: { currency: "USD", symbol: "$", rate: 0.0036 }, // example rate
    UK: { currency: "GBP", symbol: "£", rate: 0.0026 },
    JP: { currency: "JPY", symbol: "¥", rate: 0.52 },
  };

  const [country, setCountry] = useState("PK"); // default Pakistan
  const [currency, setCurrency] = useState("PKR"); // default currency
  const [currencies] = useState(countryCurrencyMap);

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    const { currency: newCurrency } = countryCurrencyMap[selectedCountry];
    setCurrency(newCurrency);
    localStorage.setItem("country", selectedCountry);
  };

  useEffect(() => {
    const savedCountry = localStorage.getItem("country") || "PK";
    setCountry(savedCountry);
    setCurrency(countryCurrencyMap[savedCountry].currency);
  }, []);

  const addToWishlist = async (productId) => {
  if (!token) return alert("Login first");

  try {
    const res = await axios.post(
      `${backendUrl}/api/user/wishlist/add/${productId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setWishlist(res.data.wishlist);
    toast.success("Added to wishlist"); // optional
  } catch (err) {
    console.error("Add to wishlist error:", err);
    toast.error("Failed to add to wishlist");
  }
};

const removeFromWishlist = async (productId) => {
  if (!token) return;

  try {
    const res = await axios.post(
      `${backendUrl}/api/user/wishlist/remove`,
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setWishlist(res.data.wishlist);
    toast.success("Removed from wishlist");
  } catch (err) {
    console.error("Remove wishlist error:", err);
    toast.error("Failed to remove from wishlist");
  }
};


// ------------------- Format Price -------------------
  const formatPrice = (amountInPKR) => {
    const { symbol, rate } = countryCurrencyMap[country];
    const converted = (amountInPKR * rate).toFixed(2);
    return `${symbol} ${converted}`;
  };


  // Voucher
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Dark Mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const navigate = useNavigate();

  // ------------------- Dark Mode -------------------
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // ------------------- Cart Functions -------------------
  const addToCart = async (itemId, size, name) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
    toast.success(`${name} (${size}) added to cart!`);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

const getCartAmount = () => {
  let totalAmount = 0;

  for (const productId in cartItems) {
    const product = products.find((p) => p._id === productId);
    if (!product) continue;

    for (const size in cartItems[productId]) {
      totalAmount += product.price * cartItems[productId][size];
    }
  }

  // Safely handle missing currency or rate
  const rate = currencies?.[currency]?.rate ?? 1;
  return totalAmount * rate;
};


  // ------------------- Voucher Validation -------------------
  const validateVoucher = async (code) => {
    if (!code) {
      toast.error("Enter a voucher code");
      return;
    }

    const cartTotal = getCartAmount();

    if (cartTotal < MIN_VOUCHER_AMOUNT) {
      toast.error(
        `Minimum cart total of ${currency}${MIN_VOUCHER_AMOUNT} required to use this voucher`
      );
      setVoucherCode("");
      setDiscount(0);
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/voucher/validate`, {
        code,
        cartItems,
      });

      if (data.success) {
        let appliedDiscount =
          data.discountType === "percentage"
            ? (cartTotal * data.discountValue) / 100
            : data.discountValue;

        // Cap discount to subtotal
        if (appliedDiscount > cartTotal) appliedDiscount = cartTotal;

        setVoucherCode(code);
        setDiscount(appliedDiscount);
        toast.success("Voucher applied!");
      } else {
        setVoucherCode("");
        setDiscount(0);
        toast.error(data.message);
      }
    } catch (err) {
      setVoucherCode("");
      setDiscount(0);
      toast.error("Invalid voucher", err);
    }
  };

  // ------------------- Product Fetch -------------------
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) setProducts(response.data.products);
      else toast.error(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) setCartItems(response.data.cartData);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ------------------- Review Functions -------------------
  const fetchReviews = async (productId, sort = "mostRecent") => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/reviews/${productId}?sort=${sort}`);
      if (data.success) return data.reviews;
      else toast.error(data.message);
      return [];
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
      return [];
    }
  };

  const createReview = async (productId, rating, comment, images = []) => {
    if (!token) {
      toast.error("Login to submit a review");
      return null;
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/reviews/${productId}`,
        { rating, comment, images },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Review submitted successfully");
        return data.review;
      } else {
        toast.error(data.message);
        return null;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
      return null;
    }
  };

  const voteHelpful = async (reviewId) => {
    if (!token) {
      toast.error("Login to mark helpful");
      return;
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/reviews/${reviewId}/helpful`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const reportReview = async (reviewId) => {
    if (!token) {
      toast.error("Login to report review");
      return;
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/reviews/${reviewId}/report`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const adminReviewAction = async (reviewId, action, note = "", brandResponse = "") => {
    if (!token) {
      toast.error("Login required");
      return;
    }
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/reviews/${reviewId}`,
        { action, note, brandResponse },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
      return data;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
      return null;
    }
  };

  // ------------------- Initialization -------------------
  useEffect(() => {
    getProductsData();
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
    const savedAdminToken = localStorage.getItem("adminToken");
  if (savedAdminToken) {
    setAdminToken(savedAdminToken);
  }
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        handleCountryChange, currencies,formatPrice,  
        delivery_fee,
        wishlist,
    addToWishlist,
    removeFromWishlist,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        adminToken,
    setAdminToken,
        voucherCode,
        setVoucherCode,
        discount,
        validateVoucher,
        darkMode,
        toggleDarkMode,
        MIN_VOUCHER_AMOUNT,
        // --------- Reviews ---------
        fetchReviews,
        createReview,
        voteHelpful,
        reportReview,
        adminReviewAction
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
