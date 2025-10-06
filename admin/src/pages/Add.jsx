import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const AddProduct = ({ token }) => {
  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    barcode: "",
    category: "",
    collection: "",
    sizes: [],
    colors: [],
    bestseller: false,
    seoTitle: "",
    seoDescription: "",
    weight: "",
    dimensions: "",
    shippingClass: "",
    customsCode: "",
    tags: [],
    returnPolicy: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => {
      const arr = new Set(prev[name]);
      arr.has(value) ? arr.delete(value) : arr.add(value);
      return { ...prev, [name]: Array.from(arr) };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (Array.isArray(value)) {
          if (value.length > 0) data.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          data.append(key, value);
        }
      });

      images.forEach((img, i) => data.append(`image${i + 1}`, img));

      const res = await axios.post(`${backendUrl}/api/product/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      setFormData({
        productId: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        sku: "",
        barcode: "",
        category: "",
        collection: "",
        sizes: [],
        colors: [],
        bestseller: false,
        seoTitle: "",
        seoDescription: "",
        weight: "",
        dimensions: "",
        shippingClass: "",
        customsCode: "",
        tags: [],
        returnPolicy: "",
      });
      setImages([]);
      setPreviews([]);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Tailwind classes
  const sectionClass =
    "bg-bgLight dark:bg-bgDark shadow-lg rounded-2xl p-6 border border-accent/20 transition-colors hover:shadow-xl";
  const headingClass =
    "text-2xl font-semibold mb-4 text-heading dark:text-textDark flex items-center gap-2";
  const inputClass =
    "border border-accent/30 p-3 rounded-lg w-full focus:ring-2 focus:ring-primary dark:bg-bgDark dark:text-textDark transition-colors placeholder:text-subtext dark:placeholder:text-subtext";
  const buttonClass =
    "px-4 py-2 rounded-full border transition hover:shadow-md font-medium";

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-bgLight dark:bg-bgDark min-h-screen transition-colors">
      <h1 className="text-3xl md:text-4xl font-bold text-heading dark:text-textDark mb-8">
        ➕ Add New Product
      </h1>

      {error && (
        <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-lg shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* GENERAL INFO */}
        <section className={sectionClass}>
          <h2 className={headingClass}>📋 General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="productId"
              placeholder="Product ID"
              value={formData.productId}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Product Title"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="collection"
              placeholder="Collection"
              value={formData.collection}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className={`${inputClass} mt-3`}
            rows="4"
          />
        </section>

        {/* MEDIA */}
        <section className={sectionClass}>
          <h2 className={headingClass}>🖼 Media</h2>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          <div className="flex flex-wrap gap-3">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="preview"
                className="w-24 sm:w-28 h-24 sm:h-28 object-cover rounded-xl shadow-md"
              />
            ))}
          </div>
        </section>

        {/* VARIANTS */}
        <section className={sectionClass}>
          <h2 className={headingClass}>🎨 Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sizes */}
            <div>
              <h3 className="font-medium mb-2 text-subtext dark:text-subtext">
                Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => handleMultiSelect("sizes", size)}
                    className={`${buttonClass} ${
                      formData.sizes.includes(size)
                        ? "bg-primary text-white border-primary"
                        : "bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark border-accent/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-medium mb-2 text-subtext dark:text-subtext">
                Colors
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Red", "Blue", "Green", "Black", "White"].map((color) => (
                  <button
                    type="button"
                    key={color}
                    onClick={() => handleMultiSelect("colors", color)}
                    className={`${buttonClass} ${
                      formData.colors.includes(color)
                        ? "bg-accent text-white border-accent"
                        : "bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark border-accent/30"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INVENTORY & PRICING */}
        <section className={sectionClass}>
          <h2 className={headingClass}>📦 Inventory & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price (USD)"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className={inputClass}
              required
            />
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="barcode"
              placeholder="Barcode"
              value={formData.barcode}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </section>

        {/* SEO & MARKETING */}
        <section className={sectionClass}>
          <h2 className={headingClass}>🔍 SEO & Marketing</h2>
          <input
            type="text"
            name="seoTitle"
            placeholder="SEO Title"
            value={formData.seoTitle}
            onChange={handleChange}
            className={`${inputClass} mb-3`}
          />
          <textarea
            name="seoDescription"
            placeholder="SEO Description"
            value={formData.seoDescription}
            onChange={handleChange}
            className={inputClass}
            rows="2"
          />
        </section>

        {/* SHIPPING & LOGISTICS */}
        <section className={sectionClass}>
          <h2 className={headingClass}>🚚 Shipping & Logistics</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="dimensions"
              placeholder="Dimensions (L×W×H cm)"
              value={formData.dimensions}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="shippingClass"
              placeholder="Shipping Class"
              value={formData.shippingClass}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="text"
              name="customsCode"
              placeholder="Customs / HS Code"
              value={formData.customsCode}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </section>

        {/* CUSTOMER OPTIONS */}
        <section className={sectionClass}>
          <h2 className={headingClass}>👥 Customer Options</h2>
          <textarea
            name="tags"
            placeholder="Tags (comma-separated)"
            value={formData.tags}
            onChange={handleChange}
            className={`${inputClass} mb-3`}
          />
          <textarea
            name="returnPolicy"
            placeholder="Return Policy"
            value={formData.returnPolicy}
            onChange={handleChange}
            className={inputClass}
          />
        </section>

        {/* SUBMIT */}
        <div className="flex justify-center md:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-primary hover:bg-accent text-white font-semibold rounded-lg shadow-lg transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;