import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Voucher = ({ token }) => {
  const [vouchers, setVouchers] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    startDate: "",
    expiryDate: "",
    usageLimit: 0,
    status: "active",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch vouchers
  const fetchVouchers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/voucher`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setVouchers(res.data.vouchers);
      else toast.error(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching vouchers");
    }
  };

  useEffect(() => {
    if (token) fetchVouchers();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await axios.put(
          `${backendUrl}/api/voucher/${editingId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) toast.success("Voucher updated!");
      } else {
        const res = await axios.post(`${backendUrl}/api/voucher`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) toast.success("Voucher added!");
      }

      setFormData({
        code: "",
        discountType: "percentage",
        discountValue: 0,
        startDate: "",
        expiryDate: "",
        usageLimit: 0,
        status: "active",
      });
      setEditingId(null);
      fetchVouchers();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error saving voucher");
    }
  };

  const handleEdit = (voucher) => {
    setFormData({
      code: voucher.code,
      discountType: voucher.discountType,
      discountValue: voucher.discountValue,
      startDate: voucher.startDate ? voucher.startDate.split("T")[0] : "",
      expiryDate: voucher.expiryDate ? voucher.expiryDate.split("T")[0] : "",
      usageLimit: voucher.usageLimit,
      status: voucher.status,
    });
    setEditingId(voucher._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this voucher?")) return;
    try {
      const res = await axios.delete(`${backendUrl}/api/voucher/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Voucher deleted");
        fetchVouchers();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting voucher");
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (vouchers.length === 0) {
      toast.error("No vouchers to export");
      return;
    }

    const headers = [
      "Code",
      "Type",
      "Value",
      "Start Date",
      "Expiry Date",
      "Usage Limit",
      "Times Used",
      "Status",
    ];

    const rows = vouchers.map((v) => [
      v.code,
      v.discountType,
      v.discountValue,
      v.startDate ? new Date(v.startDate).toLocaleDateString() : "-",
      v.expiryDate ? new Date(v.expiryDate).toLocaleDateString() : "-",
      v.usageLimit || "Unlimited",
      v.timesUsed || 0,
      v.status,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "vouchers.csv");
    link.click();
  };

  return (
    <div className="p-6 bg-bgLight dark:bg-bgDark min-h-screen text-textLight dark:text-textDark transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-heading dark:text-textDark">
          Voucher Management
        </h1>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Export CSV
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          {" "}
          <input
            type="text"
            name="code"
            placeholder="Voucher Code"
            value={formData.code}
            onChange={handleChange}
            required
            className="px-2 py-1 border rounded bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
          />{" "}
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="px-2 py-1 border rounded bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
          >
            {" "}
            <option value="percentage">Percentage</option>{" "}
            <option value="flat">Flat Amount</option>{" "}
          </select>{" "}
          <input
            type="number"
            name="discountValue"
            placeholder="Discount Value"
            value={formData.discountValue}
            onChange={handleChange}
            required
            className="px-2 py-1 border rounded bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
          />{" "}
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="px-2 py-1 border rounded bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
          />{" "}
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="px-2 py-1 border rounded bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
          />{" "}
          <input
            type="number"
            name="usageLimit"
            placeholder="Usage Limit (0 = unlimited)"
            value={formData.usageLimit}
            onChange={handleChange}
            className="px-2 py-1 border rounded bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
          />{" "}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-2 py-1 border rounded bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark"
          >
            {" "}
            <option value="active">Active</option>{" "}
            <option value="inactive">Inactive</option>{" "}
          </select>{" "}
        </div>{" "}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition"
        >
          {" "}
          {editingId ? "Update Voucher" : "Add Voucher"}{" "}
        </button>{" "}
      </form>

      {/* Voucher Table */}
      <div className="overflow-x-auto bg-bgLight dark:bg-bgDark rounded shadow transition-colors">
        <table className="min-w-full table-auto">
          <thead className="bg-subtext dark:bg-gray-700 text-heading dark:text-textDark">
            <tr>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Expiry Date</th>
              <th className="px-4 py-2">Usage</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent dark:divide-gray-700">
            {vouchers.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-4 text-textLight dark:text-textDark"
                >
                  No vouchers found.
                </td>
              </tr>
            )}
            {vouchers.map((v) => (
              <tr
                key={v._id}
                className="hover:bg-accent/20 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-2">{v.code}</td>
                <td className="px-4 py-2">{v.discountType}</td>
                <td className="px-4 py-2">{v.discountValue}</td>
                <td className="px-4 py-2">
                  {v.startDate
                    ? new Date(v.startDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2">
                  {v.expiryDate
                    ? new Date(v.expiryDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2">
                  {v.usageLimit || "Unlimited"} ({v.timesUsed || 0})
                </td>
                <td className="px-4 py-2">{v.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(v)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(v._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Voucher;
