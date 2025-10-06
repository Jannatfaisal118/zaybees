import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ adminToken }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark p-4 rounded-xl shadow-sm transition-colors">
      <p className="mb-3 text-lg font-semibold text-heading dark:text-textDark">
        All Products List
      </p>

      <div className="flex flex-col gap-2">
        {/* ------ Table Header -------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 rounded-lg bg-accent dark:bg-primary text-white text-sm font-medium">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------ Product Rows -------- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 rounded-lg border border-accent/30 dark:border-primary/40 bg-white dark:bg-[#1E1E1E] text-sm transition-colors"
          >
            <img className="w-12 h-12 object-cover rounded-md" src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold text-lg transition-colors text-right md:text-center"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
