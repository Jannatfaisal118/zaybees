import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 30; // ✅ Page size

  const getAdminToken = () => localStorage.getItem("adminToken");

  const fetchOrders = async () => {
    const adminToken = getAdminToken();
    if (!adminToken) {
      toast.error("Admin not logged in");
      return;
    }

    try {
      const res = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (res.data.success) {
        const sorted = res.data.orders.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sorted);
        setFilteredOrders(sorted);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Error fetching orders: " + (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Filters
  useEffect(() => {
    let data = [...orders];

    if (statusFilter) {
      data = data.filter((o) => o.status === statusFilter);
    }
    if (paymentFilter) {
      data = data.filter((o) =>
        paymentFilter === "Paid" ? o.payment : !o.payment
      );
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (o) =>
          o._id.toLowerCase().includes(term) ||
          `${o.address?.firstName || ""} ${o.address?.lastName || ""}`
            .toLowerCase()
            .includes(term) ||
          o.items.some((item) =>
            (item.productId?.name || "").toLowerCase().includes(term)
          )
      );
    }

    setFilteredOrders(data);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, paymentFilter, orders]);

  // ✅ Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const changePage = (page) => setCurrentPage(page);

  // ✅ Status update
  const updateStatus = async (orderId, status) => {
    const adminToken = getAdminToken();
    if (!adminToken) return toast.error("No admin token found");

    try {
      const res = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (res.data.success) {
        fetchOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Error updating status: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-gray-200 text-gray-800";
      case "Packing":
        return "bg-yellow-200 text-yellow-800";
      case "Shipped":
        return "bg-blue-200 text-blue-800";
      case "Out for Delivery":
        return "bg-indigo-200 text-indigo-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // ✅ CSV Export with detailed fields
  const csvData = filteredOrders.map((o) => ({
    "Order ID": o._id,
    "Customer Name": `${o.address?.firstName || ""} ${
      o.address?.lastName || ""
    }`,
    Email: o.address?.email || "-",
    Phone: o.address?.phone || "-",
    Address: `${o.address?.street || ""}, ${o.address?.city || ""}, ${
      o.address?.state || ""
    }, ${o.address?.country || ""}, ${o.address?.zipcode || ""}`,
    Date: new Date(o.date).toLocaleString(),
    "Product IDs + Size": o.items
      .map((i) => `[${i.productId?._id}] (${i.size}) x${i.quantity}`)
      .join(" | "),
    "Product Names + Size": o.items
      .map(
        (i) =>
          `${i.productId?.name || "Deleted Product"} (${i.size}) x${i.quantity}`
      )
      .join(" | "),
    "Delivery Type": o.deliveryType || "Standard",
    "Total Amount": `${currency} ${o.finalAmount || o.amount}`,
    "Payment Status": o.payment ? "Paid" : "Unpaid",
    "Payment Method": o.paymentMethod,
    Status: o.status || "Order Placed",
  }));

  return (
    <div className="text-textLight dark:text-textDark p-6 bg-bgLight dark:bg-bgDark min-h-screen transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-heading dark:text-textDark">
          Orders Management
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search Order ID / Customer / Product"
            className="px-3 py-2 border rounded w-full sm:w-64 text-textLight dark:text-textDark bg-bgLight dark:bg-bgDark border-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-3 py-2 border rounded text-textLight dark:text-textDark bg-bgLight dark:bg-bgDark border-accent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            className="px-3 py-2 border rounded text-textLight dark:text-textDark bg-bgLight dark:bg-bgDark border-accent"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <CSVLink
            data={csvData}
            filename={"orders.csv"}
            className="px-3 py-2 bg-primary text-white rounded hover:bg-accent transition-colors"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-bgLight dark:bg-bgDark rounded shadow transition-colors">
        <table className="min-w-full table-auto">
          <thead className="bg-bgLight dark:bg-bgDark border-b border-accent">
            <tr>
              <th className="px-4 py-2 text-center">Order ID</th>
              <th className="px-4 py-2 text-center">Customer</th>
              <th className="px-4 py-2 text-center">Date</th>
              <th className="px-4 py-2 text-center">Product IDs</th>
              <th className="px-4 py-2 text-center">Product Names</th>
              <th className="px-4 py-2 text-center">Delivery Type</th>
              <th className="px-4 py-2 text-center">Total</th>
              <th className="px-4 py-2 text-center">Payment</th>
              <th className="px-4 py-2 text-center">Status</th>{" "}
              {/* ✅ before Actions */}
              <th className="px-4 py-2 text-center">Actions</th>{" "}
              {/* ✅ last column */}
            </tr>
          </thead>

          <tbody className="divide-y divide-accent">
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4 text-subtext">
                  No orders found.
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-accent/20 transition-colors"
                >
                  <td
                    className="px-4 py-2 text-primary cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-4 py-2">
                    {order.address?.firstName} {order.address?.lastName}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {order.items
                      .map(
                        (i) =>
                          `[${i.productId?._id}] (${i.size}) x${i.quantity}`
                      )
                      .join(", ")}
                  </td>
                  <td className="px-4 py-2">
                    {order.items
                      .map(
                        (i) =>
                          `${i.productId?.name || "Deleted Product"} (${
                            i.size
                          }) x${i.quantity}`
                      )
                      .join(", ")}
                  </td>
                  <td className="px-4 py-2">
                    {order.deliveryType || "Standard"}
                  </td>
                  <td className="px-4 py-2">
                    {currency} {order.finalAmount || order.amount}
                  </td>
                  <td className="px-4 py-2">
                    {order.payment ? "Paid" : "Unpaid"}
                  </td>

                  {/* ✅ Status column */}
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                        order.status || "Order Placed"
                      )}`}
                    >
                      {order.status || "Order Placed"}
                    </span>
                  </td>

                  {/* ✅ Actions column */}
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="px-4 py-1 bg-primary text-white text-sm rounded hover:bg-accent transition-colors"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                    <select
                      className="items-center px-2 py-1 border rounded text-sm text-textLight dark:text-textDark bg-bgLight dark:bg-bgDark border-accent"
                      value={order.status || "Order Placed"}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "bg-accent/20 text-textLight dark:text-textDark"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-50 overflow-auto">
          <div className="bg-bgLight dark:bg-bgDark rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative text-textLight dark:text-textDark">
            <button
              className="absolute top-2 right-2 text-subtext font-bold"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              Order #{selectedOrder._id.slice(-6).toUpperCase()}
            </h2>
            <p>
              <strong>Customer:</strong> {selectedOrder.address?.firstName}{" "}
              {selectedOrder.address?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.address?.email || "-"}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder.address?.phone || "-"}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {selectedOrder.address
                ? `${selectedOrder.address.street}, ${selectedOrder.address.city}, ${selectedOrder.address.state}, ${selectedOrder.address.country}, ${selectedOrder.address.zipcode}`
                : "-"}
            </p>
            <p>
              <strong>Delivery Type:</strong>{" "}
              {selectedOrder.deliveryType || "Standard"}
            </p>
            <div className="mt-4">
              <strong>Items:</strong>
              <ul className="mt-2 max-h-60 overflow-y-auto space-y-1">
                {selectedOrder.items.map((item, i) => (
                  <li key={i}>
                    <span className="font-medium">ID:</span> [
                    {item.productId?._id || "-"}] |{" "}
                    <span className="font-medium">Name:</span>{" "}
                    {item.productId?.name || "Deleted Product"} |{" "}
                    <span className="font-medium">Size:</span> {item.size} |{" "}
                    <span className="font-medium">Qty:</span> {item.quantity} |{" "}
                    <span className="font-medium">Price:</span> {currency}{" "}
                    {item.productId?.price || 0}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4">
              <strong>Total Amount:</strong> {currency}{" "}
              {selectedOrder.finalAmount || selectedOrder.amount}
            </p>
            <p>
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {selectedOrder.payment ? "Paid" : "Unpaid"}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status || "Order Placed"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.date).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
