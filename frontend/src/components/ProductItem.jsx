import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const ProductItem = ({
  id,
  name,
  price,
  discount,
  image = [],
  mediaFiles = [],
  isNew,
  variants = [],
  sizes = [],
}) => {
  const { formatPrice, addToCart, backendUrl, token } =
    useContext(ShopContext);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [loadingRating, setLoadingRating] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);

  // Determine main and hover images
  const mainImage =
    mediaFiles?.[0]?.previewUrl ||
    mediaFiles?.[0]?.file ||
    mediaFiles?.[0]?.url ||
    (Array.isArray(image) ? image[0] : image) ||
    "https://via.placeholder.com/300x400?text=No+Image";

  const hoverImage =
    mediaFiles?.[1]?.previewUrl ||
    mediaFiles?.[1]?.file ||
    mediaFiles?.[1]?.url ||
    (Array.isArray(image) ? image[1] : null) ||
    mainImage;

  // Fetch average rating
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoadingRating(true);
        const { data } = await axios.get(`${backendUrl}/api/reviews/${id}`);
        const avg = data.length ? data.reduce((sum, r) => sum + r.rating, 0) / data.length : 0;
        setAvgRating(avg.toFixed(1));
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setAvgRating(0);
      } finally {
        setLoadingRating(false);
      }
    };
    if (id) fetchReviews();
  }, [id, backendUrl]);

  // Check wishlist status
  useEffect(() => {
    if (!token) return;
    const checkWishlist = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInWishlist(data.includes(id));
      } catch (error) {
        console.error(error);
      }
    };
    checkWishlist();
  }, [id, token, backendUrl]);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      alert("Please login to use wishlist");
      return;
    }
    try {
      if (inWishlist) {
        await axios.post(
          `${backendUrl}/api/user/wishlist/remove`,
          { productId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInWishlist(false);
      } else {
        await axios.post(
          `${backendUrl}/api/user/wishlist/add`,
          { productId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInWishlist(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const discountPrice = discount ? price * (1 - discount / 100) : null;
  const displayPrice = selectedVariant?.price ?? discountPrice ?? price;

  return (
    <div className="relative cursor-pointer border border-accent rounded-lg p-3 bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark">
      {isNew && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          NEW
        </span>
      )}

      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden h-60 flex items-center justify-center">
          <img
            src={mainImage}
            alt={name}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
          {hoverImage && hoverImage !== mainImage && (
            <img
              src={hoverImage}
              alt={`${name} hover`}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </div>

        <p className="pt-3 pb-1 text-sm">{name}</p>

        <div className="flex items-center text-sm" aria-label="Average Rating">
          {loadingRating ? (
            <p className="text-gray-400 italic">Loading...</p>
          ) : (
            <>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < Math.round(avgRating) ? "text-yellow-500" : "text-gray-400"}
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-gray-500">({avgRating})</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 mt-1">
          {discountPrice ? (
            <>
              <span className="text-lg font-bold text-red-500">{formatPrice(discountPrice)}</span>
              <span className="line-through text-gray-400 text-sm">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="text-lg font-bold">{formatPrice(price)}</span>
          )}
        </div>
      </Link>

      {/* Variants or Sizes */}
      {(variants?.length > 0 || sizes?.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {variants?.length > 0
            ? variants.map((v) => (
                <button
                  key={v._id || v.size}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-2 py-1 border rounded text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    selectedVariant?._id === v._id
                      ? "bg-primary text-bgLight"
                      : "bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark border-accent hover:bg-accent hover:text-white dark:hover:bg-primary dark:hover:text-white"
                  } ${v.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={v.stock === 0}
                >
                  {v.size} / {v.color} - {formatPrice(v.price)}
                </button>
              ))
            : sizes?.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedVariant({ size: s })}
                  className={`px-2 py-1 border rounded text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    selectedVariant?.size === s
                      ? "bg-primary text-bgLight"
                      : "bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark border-accent hover:bg-accent hover:text-white dark:hover:bg-primary dark:hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() =>
            addToCart(id, selectedVariant?.size, name, selectedVariant?.price ?? displayPrice)
          }
          disabled={(variants?.length > 0 && !selectedVariant)}
          className="flex-1 bg-primary text-bgLight py-2 rounded hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Add to Cart
        </button>

        <button
          onClick={handleWishlistToggle}
          className={`px-2 py-2 rounded focus:outline-none focus:ring-2 ${
            inWishlist
              ? "bg-red-500 text-white focus:ring-red-600"
              : "bg-accent text-white focus:ring-accent hover:bg-primary"
          }`}
          aria-pressed={inWishlist}
        >
          {inWishlist ? "💙" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
