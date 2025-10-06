import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { backendUrl } from "../App";

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [countryOrders, setCountryOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#16a34a", "#2563eb", "#9333ea", "#f97316"];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [kpiRes, salesRes, countryRes] = await Promise.all([
          axios.get(`${backendUrl}/api/dashboard/kpis`),
          axios.get(`${backendUrl}/api/dashboard/sales`),
          axios.get(`${backendUrl}/api/dashboard/orders-by-country`),
        ]);

        setKpis(kpiRes.data);
        setSalesData(salesRes.data);
        setCountryOrders(countryRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --- CSV Export Helpers ---
  const exportCSV = (data, filename, headers) => {
    if (!data || data.length === 0) return;

    const csvRows = [];
    csvRows.push(headers.join(",")); // header row

    data.forEach((row) => {
      const values = headers.map((h) => JSON.stringify(row[h] ?? ""));
      csvRows.push(values.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-6 text-textLight dark:text-textDark">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-bgLight dark:bg-bgDark min-h-screen transition-colors">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-heading dark:text-textDark">
          Admin Dashboard
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => exportCSV(salesData, "sales-data.csv", ["month", "sales"])}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Export Sales CSV
          </button>
          <button
            onClick={() => exportCSV(countryOrders, "country-orders.csv", ["name", "value"])}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Export Country Orders CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-bgLight dark:bg-gray-800 shadow-md rounded-2xl p-5 transition-colors">
          <h3 className="text-subtext text-sm">Total Sales</h3>
          <p className="text-3xl font-bold text-green-600">
            Rs. {kpis.totalSales.toLocaleString()}
          </p>
          <span className="text-xs text-subtext">{kpis.salesGrowth}</span>
        </div>

        <div className="bg-bgLight dark:bg-gray-800 shadow-md rounded-2xl p-5 transition-colors">
          <h3 className="text-subtext text-sm">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{kpis.totalOrders}</p>
          <span className="text-xs text-subtext">
            Pakistan & Intl Markets
          </span>
        </div>

        <div className="bg-bgLight dark:bg-gray-800 shadow-md rounded-2xl p-5 transition-colors">
          <h3 className="text-subtext text-sm">Customers</h3>
          <p className="text-3xl font-bold text-purple-600">
            {kpis.totalCustomers}
          </p>
          <span className="text-xs text-subtext">Active Customers</span>
        </div>

        <div className="bg-bgLight dark:bg-gray-800 shadow-md rounded-2xl p-5 transition-colors">
          <h3 className="text-subtext text-sm">Low Stock Items</h3>
          <p className="text-3xl font-bold text-red-600">
            {kpis.lowStockItems}
          </p>
          <span className="text-xs text-subtext">Restock Needed</span>
        </div>
      </div>

      {/* Sales Trend + Orders by Country */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-bgLight dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors">
          <h3 className="text-lg font-semibold text-heading dark:text-textDark mb-4">
            Monthly Sales (PKR)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Country */}
        <div className="bg-bgLight dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors">
          <h3 className="text-lg font-semibold text-heading dark:text-textDark mb-4">
            Orders by Country
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryOrders}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                dataKey="value"
              >
                {countryOrders.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-4 text-sm text-subtext dark:text-gray-300">
            {countryOrders.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i] }}
                ></span>
                {c.name}: {c.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
