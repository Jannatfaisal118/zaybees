import React, { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm";


const OrderHistory = ({ ordersData, token, backendUrl, t, reloadOrders }) => {
  const [orders, setOrders] = useState([]);
  const [reviewingProduct, setReviewingProduct] = useState(null);

  const statusColors = {
    Delivered: "bg-green-500",
    Shipped: "bg-blue-500",
    Pending: "bg-yellow-500",
    Cancelled: "bg-red-500",
  };

  useEffect(() => {
    if (ordersData) {
      const sorted = ordersData.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setOrders(sorted);
    }
  }, [ordersData]);

  return (
    <div className="mt-4">
      {!orders.length ? (
        <div className="mt-8 text-center">
          <p className="text-lg text-subtext dark:text-accent">{t("noOrdersYet")}</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-900 flex flex-col md:flex-row justify-between gap-4"
            >
              {/* Order Info */}
              <div className="flex flex-col gap-2">
                <p><strong>{t("orderId")}:</strong> {order._id}</p>
                <p><strong>{t("date")}:</strong> {new Date(order.date).toLocaleString()}</p>
                <p><strong>{t("total")}:</strong> {order.currency} {order.amount}</p>
                <p>
                  <strong>{t("status")}:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      statusColors[order.status] || "bg-gray-500"
                    }`}
                  >
                    {t(order.status.toLowerCase()) || order.status}
                  </span>
                </p>
                <div className="mt-2">
                  <strong>{t("products")}:</strong>
                  <ul className="list-disc list-inside">
                    {order.items.map((i, idx) => (
                      <li key={i.productId?._id || idx}>
                        {i.productId?.name || t("product")} x {i.quantity}
                        {i.reviewed && (
                          <span className="text-green-600 text-sm ml-2">({t("reviewed")})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 justify-center">
                <button
                  className="border border-accent px-4 py-2 text-sm rounded hover:bg-accent hover:text-bgLight"
                  onClick={() => window.alert(t("trackOrder"))}
                >
                  {t("trackOrder")}
                </button>
                <button
                  className="border border-accent px-4 py-2 text-sm rounded hover:bg-accent hover:text-bgLight"
                  onClick={() => window.alert(t("viewDetails"))}
                >
                  {t("viewDetails")}
                </button>

                {order.status === "Delivered" &&
                  order.items.map((i) =>
                    i.productId ? (
                      <div key={i.productId._id}>
                        {!i.reviewed ? (
                          <button
                            className="border border-accent px-4 py-2 text-sm rounded hover:bg-accent hover:text-bgLight mt-2"
                            onClick={() =>
                              setReviewingProduct({ productId: i.productId._id, orderId: order._id })
                            }
                          >
                            {t("writeReviewFor")} {i.productId.name}
                          </button>
                        ) : (
                          <span className="text-green-600 text-sm ml-2">✅ {t("alreadyReviewed")}</span>
                        )}
                      </div>
                    ) : null
                  )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {reviewingProduct && (
        <ReviewForm
          isOpen={!!reviewingProduct}
          onClose={() => setReviewingProduct(null)}
          productId={reviewingProduct.productId}
          orderId={reviewingProduct.orderId}
          token={token}
          backendUrl={backendUrl}
          onReviewAdded={reloadOrders}
        />
      )}
    </div>
  );
};

export default OrderHistory;
