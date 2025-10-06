import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext.jsx"; // Use your context

const ReviewForm = ({ isOpen, onClose, productId, token, backendUrl, onReviewAdded }) => {
  const { t } = useContext(LanguageContext); // translation function

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setRating(0);
    setHover(null);
    setComment("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId) return toast.error(t("INVALID_PRODUCT_ID"));
    if (!rating) return toast.error(t("SELECT_RATING"));
    if (!comment.trim()) return toast.error(t("ENTER_COMMENT"));

    setLoading(true);
    try {
      await axios.post(
        `${backendUrl}/api/reviews/${productId}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(t("REVIEW_SUBMITTED"));
      resetForm();
      onClose();
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      const message = err.response?.data?.message || t("REVIEW_FAILED");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold text-center mb-4">{t("WRITE_REVIEW")}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    (hover || rating) >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Comment Box */}
          <textarea
            placeholder={t("SHARE_EXPERIENCE")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md resize-none dark:bg-gray-800 dark:text-white"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
              disabled={loading}
            >
              {t("CANCEL")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? t("SUBMITTING") : t("SUBMIT_REVIEW")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
