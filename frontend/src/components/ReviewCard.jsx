import React, { useContext } from "react";
import { Star } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext.jsx"; // use LanguageContext

const ReviewCard = ({ review }) => {
  const { t, language } = useContext(LanguageContext); // translation function and current language
  const { user, rating, comment, createdAt } = review;

  const formattedDate = new Date(createdAt).toLocaleDateString(
    language === 'ja' ? 'ja-JP' : 'en-US', // Use current language
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="border rounded-2xl p-4 shadow-sm bg-white hover:shadow-md transition">
      {/* Reviewer Info */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{user?.name || t("ANONYMOUS")}</h3>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-700 leading-relaxed">{comment}</p>
    </div>
  );
};

export default ReviewCard;
