import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv"; // ✅ Import CSV Export

// --- View/Edit Modal ---
const CustomerModal = ({ customer, onClose, editable, onSave }) => {
  const [formData, setFormData] = useState({ ...customer });

  if (!customer) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => onSave(formData);

  const locale = ["en-US", "en-GB", "en-IN", "en-PK"].includes(customer.country)
    ? customer.country
    : "en-US";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark rounded-lg p-6 w-full max-w-lg relative transition-colors">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-subtext hover:text-heading dark:hover:text-textLight"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4">
          {editable ? "Edit Customer" : "View Customer"}
        </h3>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Country</label>
          {editable ? (
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="px-3 py-2 border rounded"
            />
          ) : (
            <p>{customer.country}</p>
          )}

          <label className="font-medium">Status</label>
          {editable ? (
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="px-3 py-2 border rounded"
            >
              {["Active", "Inactive", "Banned"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <p>{customer.status}</p>
          )}

          <label className="font-medium">Loyalty Tier</label>
          {editable ? (
            <select
              name="loyaltyTier"
              value={formData.loyaltyTier}
              onChange={handleChange}
              className="px-3 py-2 border rounded"
            >
              {["Bronze", "Silver", "Gold", "Platinum"].map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          ) : (
            <p>{customer.loyaltyTier}</p>
          )}

          <label className="font-medium">Total Orders</label>
          <p>{customer.totalOrders || 0}</p>

          <label className="font-medium">Total Spend</label>
          <p>
            {new Intl.NumberFormat(locale, {
              style: "currency",
              currency: "USD",
            }).format(customer.totalSpend || 0)}
          </p>

          <label className="font-medium">Last Order</label>
          <p>
            {customer.lastOrder !== "N/A" && customer.lastOrder
              ? customer.lastOrder
              : "No orders yet"}
          </p>
        </div>

        {editable && (
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

// --- Main Customers Page ---
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editable, setEditable] = useState(false);

  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch customers
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {
        search: search || undefined,
        country: filterCountry || undefined,
        status: filterStatus || undefined,
        _sort: sortField,
        _order: sortOrder,
      };
      const res = await axios.get("http://localhost:4000/api/customers", {
        params,
      });
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, filterCountry, filterStatus, sortField, sortOrder]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEdit = async (updatedCustomer) => {
    try {
      await axios.put(
        `http://localhost:4000/api/user/${updatedCustomer._id}`,
        updatedCustomer
      );
      setSelectedCustomer(null);
      setEditable(false);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  // Dynamic filters
  const countries = [
    ...new Set(customers.map((c) => c.country).filter(Boolean)),
  ];
  const statuses = [
    ...new Set(customers.map((c) => c.status).filter(Boolean)),
  ];

  // Pagination logic
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentCustomers = customers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(customers.length / rowsPerPage);

  const handleSort = (field) => {
    if (sortField === field)
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // ✅ CSV Data
  const csvData = customers.map((c) => ({
    Name: c.name,
    Email: c.email,
    Country: c.country,
    "Total Orders": c.totalOrders || 0,
    "Total Spend": c.totalSpend || 0,
    "Last Order": c.lastOrder || "No orders yet",
    Status: c.status,
    "Loyalty Tier": c.loyaltyTier,
  }));

  if (loading) return <p className="p-6">Loading customers...</p>;

  return (
    <div className="p-6 bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Customers</h2>
          <p className="text-gray-600">Manage your customers here.</p>
        </div>
        <CSVLink
          data={csvData}
          filename="customers.csv"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition-colors"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-4 text-textLight dark:text-bgDark">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg bg-bgLight dark:bg-bgDark transition-colors">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {[
                "Name",
                "Email",
                "Country",
                "Total Orders",
                "Total Spend",
                "Last Order",
                "Status",
                "Loyalty Tier",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="text-left px-4 py-2 border cursor-pointer"
                  onClick={() =>
                    handleSort(head.toLowerCase().replace(" ", ""))
                  }
                >
                  {head}{" "}
                  {sortField === head.toLowerCase().replace(" ", "")
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((c) => {
              const locale = ["en-US", "en-GB", "en-IN", "en-PK"].includes(
                c.country
              )
                ? c.country
                : "en-US";
              return (
                <tr
                  key={c._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 border">{c.name}</td>
                  <td className="px-4 py-2 border">{c.email}</td>
                  <td className="px-4 py-2 border">{c.country}</td>
                  <td className="px-4 py-2 border">{c.totalOrders || 0}</td>
                  <td className="px-4 py-2 border">
                    {new Intl.NumberFormat(locale, {
                      style: "currency",
                      currency: "USD",
                    }).format(c.totalSpend || 0)}
                  </td>
                  <td className="px-4 py-2 border">
                    {c.lastOrder !== "N/A" && c.lastOrder
                      ? c.lastOrder
                      : "No orders yet"}
                  </td>
                  <td className="px-4 py-2 border">{c.status}</td>
                  <td className="px-4 py-2 border">{c.loyaltyTier}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCustomer(c);
                        setEditable(false);
                      }}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCustomer(c);
                        setEditable(true);
                      }}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center px-4 py-6 text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => {
            setSelectedCustomer(null);
            setEditable(false);
          }}
          editable={editable}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Customers;
