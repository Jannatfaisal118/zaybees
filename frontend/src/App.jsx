import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Verify from './pages/Verify';
import MyProfile from './pages/MyProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import LanguageOverlay from './components/LanguageOverlay';
import { LanguageContext } from './context/LanguageContext.jsx';
import { ShopContext } from "./context/ShopContext";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const { language } = useContext(LanguageContext);
  const { token } = useContext(ShopContext);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add('dark');
    else html.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Show overlay if language not selected
  if (!language) return <LanguageOverlay
        isLoggedIn={!!token}
        onSelect={(lang) => console.log("Language selected:", lang)}
      />
  return (
    <div className={`min-h-screen flex flex-col
      bg-bgLight text-textLight
      dark:bg-bgDark dark:text-textDark
      transition-colors duration-500
      px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <SearchBar />
      <ScrollToTop />
      <main className="flex-1 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        
      </main>
      
      <Footer />
      
    </div>
  )
};

export default App;
