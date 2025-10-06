import React, { useState, useEffect } from "react";
import axios from "axios";

const backendUrl = "http://localhost:4000"; // Replace this with your backend URL

const Settings = () => {
  const adminToken = localStorage.getItem("adminToken");

  const [settings, setSettings] = useState({
    general: { name: "", email: "", contact: "", logo: null, favicon: null },
    store: { currency: "USD", languages: ["en"], shippingZones: [], taxRates: [] },
    users: { adminUsers: [], roles: [] },
    integrations: { paymentGateways: {}, analyticsKey: "", emailMarketingKey: "" },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch settings from backend
  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/settings`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setSettings(data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Handle input changes
  const handleChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  // Handle file uploads
  const handleFileChange = (section, key, file) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: file },
    }));
  };

  // Save settings
  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      Object.keys(settings).forEach((section) => {
        Object.keys(settings[section]).forEach((key) => {
          const value = settings[section][key];
          if (value instanceof File) {
            formData.append(`${section}.${key}`, value);
          } else if (Array.isArray(value) || typeof value === "object") {
            formData.append(`${section}.${key}`, JSON.stringify(value));
          } else {
            formData.append(`${section}.${key}`, value);
          }
        });
      });

      const { data } = await axios.put(`${backendUrl}/api/settings`, formData, {
        headers: { Authorization: `Bearer ${adminToken}`, "Content-Type": "multipart/form-data" },
      });

      setSettings(data.settings);
      setMessage("✅ Settings updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-bgLight dark:bg-bgDark min-h-screen transition-colors">
      <h1 className="text-2xl font-bold text-heading dark:text-textDark">
        Admin Settings
      </h1>

      {loading && <p className="text-primary">Loading...</p>}
      {message && (
        <p
          className={`${
            message.includes("Failed") ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* General */}
      <section className="border border-accent dark:border-primary p-4 rounded space-y-2 bg-white dark:bg-gray-800">
        <h2 className="font-semibold text-heading dark:text-textDark">General</h2>
        <input
          type="text"
          placeholder="Site Name"
          value={settings.general?.name || ""}
          onChange={(e) => handleChange("general", "name", e.target.value)}
          className="border p-2 rounded w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
        />
        <input
          type="email"
          placeholder="Email"
          value={settings.general?.email || ""}
          onChange={(e) => handleChange("general", "email", e.target.value)}
          className="border p-2 rounded w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
        />
        <input
          type="text"
          placeholder="Contact"
          value={settings.general?.contact || ""}
          onChange={(e) => handleChange("general", "contact", e.target.value)}
          className="border p-2 rounded w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
        />
        <div>
          <label className="block text-subtext">Logo</label>
          <input
            type="file"
            onChange={(e) => handleFileChange("general", "logo", e.target.files[0])}
            className="text-textLight dark:text-textDark"
          />
        </div>
        <div>
          <label className="block text-subtext">Favicon</label>
          <input
            type="file"
            onChange={(e) => handleFileChange("general", "favicon", e.target.files[0])}
            className="text-textLight dark:text-textDark"
          />
        </div>
      </section>

      {/* Store */}
      <section className="border border-accent dark:border-primary p-4 rounded space-y-2 bg-white dark:bg-gray-800">
        <h2 className="font-semibold text-heading dark:text-textDark">
          Store & E-commerce
        </h2>
        <input
          type="text"
          placeholder="Currency"
          value={settings.store?.currency || ""}
          onChange={(e) => handleChange("store", "currency", e.target.value)}
          className="border p-2 rounded w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
        />
        <input
          type="text"
          placeholder="Languages (comma separated)"
          value={settings.store.languages.join(",")}
          onChange={(e) =>
            handleChange("store", "languages", e.target.value.split(","))
          }
          className="border p-2 rounded w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
        />
      </section>

      {/* Integrations */}
      <section className="border border-accent dark:border-primary p-4 rounded space-y-2 bg-white dark:bg-gray-800">
        <h2 className="font-semibold text-heading dark:text-textDark">
          System & Integrations
        </h2>
        <input
          type="text"
          placeholder="Analytics Key"
          value={settings.integrations?.analyticsKey || ""}
          onChange={(e) => handleChange("integrations", "analyticsKey", e.target.value)}
          className="border p-2 rounded w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
        />
        <input
          type="text"
          placeholder="Email Marketing Key"
          value={settings.integrations?.emailMarketingKey || ""}
          onChange={(e) =>
            handleChange("integrations", "emailMarketingKey", e.target.value)
          }
          className="border p-2 rounded w-full bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
        />
      </section>

      <button
        onClick={handleSave}
        className="px-6 py-2 bg-primary hover:bg-accent text-white rounded transition-colors"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
