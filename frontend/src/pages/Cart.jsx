import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { LanguageContext } from "../context/LanguageContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, formatPrice, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const { t } = useContext(LanguageContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark transition-colors duration-500">
      
      {/* Page Title */}
      <div className="text-2xl mb-6 text-heading dark:text-textDark">
        <Title text1={t("cart.title1")} text2={t("cart.title2")} />
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {cartData.length === 0 && (
          <p className="text-subtext dark:text-accent text-center py-8">
            {t("cart.empty")}
          </p>
        )}

        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 px-2 sm:px-4 border border-accent/30 dark:border-accent/70 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:shadow-lg hover:shadow-accent/20 dark:hover:shadow-accent/40"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-[60%]">
                <img
                  className="w-16 sm:w-24 rounded-md border border-accent/40"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div className="flex flex-col gap-2">
                  <p className="text-heading dark:text-textDark font-medium text-sm sm:text-lg">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-subtext dark:text-accent">
  {formatPrice(productData.price)}
</p>

                    <span className="px-2 sm:px-3 py-1 border border-accent rounded text-subtext dark:text-textDark bg-bgLight dark:bg-bgDark">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="w-16 sm:w-20 px-2 py-1 border border-accent rounded text-center bg-bgLight dark:bg-bgDark dark:border-accent dark:text-textDark focus:outline-none focus:ring-2 focus:ring-primary transition"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Remove Item */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform"
                src={assets.bin_icon}
                alt={t("cart.remove")}
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total & Checkout */}
      {cartData.length > 0 && (
        <div className="flex justify-end mt-10 sm:mt-16">
          <div className="w-full sm:w-[450px] flex flex-col gap-4">
            <CartTotal />
            <button
              onClick={() => navigate("/place-order")}
              className="bg-primary text-bgLight dark:bg-accent dark:text-bgDark px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all"
            >
              {t("cart.checkout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
