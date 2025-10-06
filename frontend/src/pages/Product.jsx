import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { LanguageContext } from "../context/LanguageContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {
  const { t } = useContext(LanguageContext);
  const { productId } = useParams();
  const { products, formatPrice, addToCart, token, backendUrl } =
    useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainMedia, setMainMedia] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);

  // Fetch product data
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const product = products.find((p) => p._id === productId);
    if (product) {
      setProductData(product);
      setMainMedia(
        product.mediaFiles?.[0]?.previewUrl ||
          product.mediaFiles?.[0]?.file ||
          product.image?.[0] ||
          null
      );
    } else {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(
            `${backendUrl}/api/product/${productId}`
          );
          setProductData(data);
          setMainMedia(
            data.mediaFiles?.[0]?.previewUrl ||
              data.mediaFiles?.[0]?.file ||
              data.image?.[0] ||
              null
          );
        } catch (error) {
          console.error(
            "Failed to fetch product:",
            error.response?.data || error.message
          );
        }
      };
      fetchProduct();
    }
  }, [productId, products, backendUrl]);

  // Fetch wishlist status
  useEffect(() => {
    if (!token) return;
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInWishlist(data.includes(productId));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [productId, token, backendUrl]);

  const toggleWishlist = async () => {
    if (!token) {
      toast.error("Please login to use wishlist");
      return;
    }
    try {
      if (inWishlist) {
        await axios.post(
          `${backendUrl}/api/user/wishlist/remove`,
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInWishlist(false);
        toast.info("Removed from wishlist");
      } else {
        await axios.post(
          `${backendUrl}/api/user/wishlist/add`,
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInWishlist(true);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Error updating wishlist");
    }
  };

  // Fetch product reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/reviews/${productId}`
        );
        setReviews(data);
        setAvgRating(
          data.length
            ? (
                data.reduce((sum, r) => sum + r.rating, 0) / data.length
              ).toFixed(1)
            : 0
        );
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    if (productId) fetchReviews();
  }, [productId, backendUrl]);

  if (!productData) return <div className="opacity-0">Loading...</div>;

  const discountedPrice =
    productData.discount && productData.discount > 0
      ? productData.price * (1 - productData.discount / 100)
      : null;
  const displayPrice =
    selectedVariant?.price ?? discountedPrice ?? productData.price;

  // Fix stock display
  const displayStock =
    selectedVariant?.stock ??
    (productData.stockQuantity != null ? productData.stockQuantity : "Out of Stock");

  const mediaItems =
    productData.mediaFiles?.length > 0
      ? productData.mediaFiles
      : productData.image
      ? productData.image.map((img) => ({ type: "image", previewUrl: img }))
      : [];

  return (
    <div className="border-t-2 border-accent pt-10 transition-opacity ease-in duration-500 opacity-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Media gallery */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overscroll-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {mediaItems.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  setMainMedia(item.previewUrl || item.file || item)
                }
                className={`cursor-pointer border border-accent rounded overflow-hidden mb-2 ${
                  mainMedia === (item.previewUrl || item.file || item)
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                style={{ width: "24%", smWidth: "100%" }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.previewUrl || item.file}
                    className="object-cover w-full h-20"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={item.previewUrl || item.file || item}
                    alt={`${productData.name} media ${index + 1}`}
                    className="object-cover w-full h-20"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="w-full sm:w-[80%] border border-accent rounded overflow-hidden">
            {mainMedia &&
            (mainMedia.endsWith?.(".mp4") ||
              (mainMedia.startsWith?.("blob:") &&
                mainMedia.includes("video"))) ? (
              <video
                src={mainMedia}
                controls
                className="w-full h-auto"
                alt={productData.name}
              />
            ) : (
              <img
                src={mainMedia}
                alt={productData.name}
                className="w-full h-auto"
              />
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="font-semibold text-3xl text-heading dark:text-textDark">
            {productData.name}
          </h1>

          {/* Category & Tags */}
          <div className="text-sm text-subtext dark:text-accent space-y-1">
            {productData.category && (
              <p>
                <strong>Category:</strong> {productData.category}
              </p>
            )}
            {productData.tags && (
              <p>
                <strong>Tags:</strong>{" "}
                {(Array.isArray(productData.tags)
                  ? productData.tags
                  : typeof productData.tags === "string"
                  ? productData.tags.split(",")
                  : []
                ).map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-200 dark:bg-gray-700 rounded px-2 py-0.5 mr-1 text-xs"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.round(avgRating)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt="Star"
                className="w-4"
              />
            ))}
            <p className="pl-2 text-subtext dark:text-accent">
              {avgRating} • {reviews.length} {t("review")}
              {reviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Price */}
          <div className="mt-4">
            {discountedPrice ? (
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(displayPrice)}
                </p>
                <p className="line-through text-gray-500 dark:text-gray-400">
                  {formatPrice(productData.price)}
                </p>
                <p className="text-sm text-red-600 font-semibold">
                  {productData.discount}% off
                </p>
              </div>
            ) : (
              <p className="text-3xl font-bold text-primary">
                {formatPrice(displayPrice)}
              </p>
            )}
          </div>

          {/* Stock */}
          <p className="text-sm text-subtext dark:text-accent">
            Stock: {displayStock}
          </p>

          {/* Variants or Sizes */}
          {(productData.variants?.length > 0 || productData.sizes?.length > 0) && (
            <div className="mt-6">
              <p className="font-semibold mb-2">
                {t("selectVariant") || t("selectSize")}
              </p>

              <div className="flex flex-wrap gap-3">
                {productData.variants?.length > 0 &&
                  productData.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(variant)}
                      className={`border px-4 py-2 rounded transition-colors duration-200 ${
                        selectedVariant?._id === variant._id
                          ? "ring-2 ring-primary bg-primary text-white"
                          : "bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark hover:bg-accent hover:text-white dark:hover:bg-primary dark:hover:text-white"
                      }`}
                    >
                      {variant.size} / {variant.color} -{" "}
                      {formatPrice(variant.price)} - Stock: {variant.stock}
                    </button>
                  ))}

                {(!productData.variants || productData.variants.length === 0) &&
                  productData.sizes?.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant({ size })}
                      className={`border px-4 py-2 rounded transition-colors duration-200 ${
                        selectedVariant?.size === size
                          ? "ring-2 ring-primary bg-primary text-white"
                          : "bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark hover:bg-accent hover:text-white dark:hover:bg-primary dark:hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Size Chart */}
          <div className="mt-4">
            <p
              onClick={() => setSizeChartOpen(true)}
              className="cursor-pointer text-accent underline inline-block"
            >
              {t("sizeChart")}
            </p>
            {sizeChartOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="relative bg-white dark:bg-bgDark rounded-2xl shadow-lg p-4 max-w-md w-full">
                  <button
                    onClick={() => setSizeChartOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-accent text-xl font-bold"
                    aria-label="Close size chart"
                  >
                    &times;
                  </button>
                  <img
                    src={assets.size_chart}
                    alt="Size Chart"
                    className="rounded-lg max-h-[70vh] w-auto mx-auto"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart / Wishlist */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <button
              disabled={displayStock === 0 || displayStock === "Out of Stock"}
              onClick={() => addToCart(productData._id, selectedVariant?.size)}
              className={`px-8 py-3 text-sm rounded ${
                displayStock === 0 || displayStock === "Out of Stock"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary text-bgLight hover:bg-accent"
              }`}
            >
              {t("addToCart")}
            </button>
            <button
              onClick={toggleWishlist}
              className={`px-6 py-3 border text-sm rounded ${
                inWishlist
                  ? "bg-red-500 text-white"
                  : "bg-bgLight dark:bg-bgDark text-heading dark:text-textDark"
              }`}
            >
              {inWishlist ? "♥ In Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex flex-wrap gap-2">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border border-accent px-5 py-3 text-sm rounded ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "text-heading dark:text-textDark"
              }`}
            >
              {t(tab)}
              {tab === "reviews" && ` (${reviews.length})`}
            </button>
          ))}
        </div>

        <div className="border border-accent px-6 py-6 text-sm text-subtext dark:text-accent mt-4 rounded min-h-[150px]">
          {activeTab === "description" && (
            <>
              {productData.shortDescription && (
                <p className="mb-4 font-semibold">
                  {productData.shortDescription}
                </p>
              )}
              <p>{productData.longDescription || productData.description}</p>
            </>
          )}

          {activeTab === "reviews" && (
            <div>
              <p className="font-medium mb-4">
                ⭐ {avgRating} / 5 {t("basedOn")} {reviews.length} {t("review")}
                {reviews.length !== 1 ? "s" : ""}
              </p>
              {reviews.length > 0 ? (
                <div className="grid gap-4">
                  {reviews.map((r) => (
                    <ReviewCard key={r._id} review={r} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">{t("noReviewsYet")}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
