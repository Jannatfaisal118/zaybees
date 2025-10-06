import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";
import { LanguageContext } from "../context/LanguageContext.jsx";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const { t } = useContext(LanguageContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortType, setSortType] = useState("relavent");

  // --- Toggle Handlers ---
  const toggleValue = (value, setter, state) => {
    if (state.includes(value)) {
      setter((prev) => prev.filter((item) => item !== value));
    } else {
      setter((prev) => [...prev, value]);
    }
  };

  // --- Reset Handlers ---
  const resetCategory = () => setCategory([]);
  const resetSubCategory = () => setSubCategory([]);
  const resetColors = () => setColors([]);
  const resetPriceRange = () => setPriceRange([0, 1000]);

  // --- Filtering ---
  const applyFilter = () => {
    let productsCopy = [...products];

    // Search
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Color
    if (colors.length > 0) {
      productsCopy = productsCopy.filter((item) => colors.includes(item.color));
    }

    // Material
    if (materials.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        materials.includes(item.material)
      );
    }

    // Price
    productsCopy = productsCopy.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    setFilterProducts(productsCopy);
  };

  // --- Sorting ---
  const sortProduct = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      case "newest":
        setFilterProducts(
          fpCopy.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [
    category,
    subCategory,
    colors,
    materials,
    priceRange,
    search,
    showSearch,
    products,
  ]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-accent dark:border-primary bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark">
      {/* --- Filter Options --- */}
      <div className="min-w-40">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          {t("filters")}
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-accent dark:border-primary pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <div className="flex justify-between items-center">
            <p className="mb-3 text-sm font-medium">{t("categories")}</p>
            {category.length > 0 && (
              <button
                onClick={resetCategory}
                title={t("reset")}
                className="p-1 -mt-3 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <img src={assets.reset_icon} alt="Reset" className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm font-light">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={(e) =>
                    toggleValue(e.target.value, setCategory, category)
                  }
                />
                {t(cat.toLowerCase())}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-accent dark:border-primary pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <div className="flex justify-between items-center">
            <p className="mb-3 text-sm font-medium">{t("type")}</p>
            {subCategory.length > 0 && (
              <button
                onClick={resetSubCategory}
                title={t("reset")}
                className="p-1 -mt-3 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <img src={assets.reset_icon} alt="Reset" className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2 text-sm font-light">
            {["Denim", "Leather"].map((sub) => (
              <label key={sub} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={sub}
                  checked={subCategory.includes(sub)}
                  onChange={(e) =>
                    toggleValue(e.target.value, setSubCategory, subCategory)
                  }
                />
                {t(sub.toLowerCase())}
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div
          className={`border border-accent dark:border-primary pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <div className="flex justify-between items-center">
            <p className="mb-3 text-sm font-medium">{t("colors")}</p>
            {colors.length > 0 && (
              <button
                onClick={resetColors}
                title={t("reset")}
                className="p-1 -mt-3 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <img src={assets.reset_icon} alt="Reset" className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Black", "White", "Blue", "Red"].map((clr) => (
              <button
                key={clr}
                className={`w-6 h-6 rounded-full border border-accent border-spacing-14 border-double ${
                  colors.includes(clr) ? "ring-2 ring-primary" : ""
                }`}
                style={{ backgroundColor: clr.toLowerCase() }}
                onClick={() => toggleValue(clr, setColors, colors)}
              />
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div
          className={`border border-accent dark:border-primary pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <div className="flex justify-between items-center">
            <p className="mb-3 text-sm font-medium">{t("priceRange")}</p>
            {priceRange[1] !== 1000 && (
              <button
                onClick={resetPriceRange}
                title={t("reset")}
                className="p-1 -mt-3 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <img src={assets.reset_icon} alt="Reset" className="w-4 h-4" />
              </button>
            )}
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full"
          />
          <p className="text-xs">
            {t("upTo")} ${priceRange[1]}
          </p>
        </div>
      </div>

      {/* --- Right Side --- */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={t("all")} text2={t("collections")} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-accent dark:border-primary text-sm px-2 bg-bgLight dark:bg-bgDark dark:text-textDark"
          >
            <option value="relavent">{t("sortRelavent")}</option>
            <option value="newest">{t("sortNewest")}</option>
            <option value="low-high">{t("sortLowHigh")}</option>
            <option value="high-low">{t("sortHighLow")}</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              sizes={item.sizes}
              badge={item.badge} // e.g., "New" or "Sale"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
