import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { LanguageContext } from "../context/LanguageContext.jsx";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const { t } = useContext(LanguageContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    // ✅ If active flag missing, fallback to show all products
    const activeProducts = products.filter((p) => p.active !== false);

    // ✅ Sort by createdAt (if available) or just take newest in array
    const sorted = [...activeProducts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setLatestProducts(sorted.slice(0, 10));
  }, [products]);

  if (!latestProducts || latestProducts.length === 0) {
    return (
      <div className="text-center py-10 text-subtext dark:text-accent">
        {t("noProductsFound")}
      </div>
    );
  }

  return (
    <div className="my-10 bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark">
      <div className="text-center py-8 text-3xl">
        <Title text1={t("latest")} text2={t("collections")} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-subtext dark:text-accent">
          {t("latest_description")}
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => {
          const mainImage =
  // New schema support
  item.mediaFiles?.[0]?.previewUrl ||
  item.mediaFiles?.[0]?.file ||
  // Old schema support
  (Array.isArray(item.image) ? item.image[0] : item.image) ||
  // SEO alt text fallback if you store single string
  item.imageAltText ||
  // Default fallback
  "/placeholder.png";


          const discountedPrice =
            item.discount && item.discount > 0
              ? item.price * (1 - item.discount / 100)
              : null;

          const firstVariant = item.variants?.[0];

          return (
            <ProductItem
              key={item._id}
              id={item._id}
              image={mainImage}
              name={item.name}
              price={discountedPrice ?? firstVariant?.price ?? item.price}
              sizes={firstVariant ? [firstVariant.size] : item.sizes}
              discount={item.discount}
              stock={firstVariant?.stock ?? item.stockQuantity}
              active={item.active}
              featured={item.featured}
              category={item.category}
              brand={item.brand}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollection;
