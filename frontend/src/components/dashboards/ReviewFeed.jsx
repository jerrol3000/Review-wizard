import React from 'react';

export const ReviewFeed = ({ reviews }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">
      Recent Reviews
    </h2>
    <div className="bg-white shadow-md p-4 rounded-md">
      {reviews.slice(0, 10).map((review) => (
        <div
          key={review.reviewId}
          className="p-4 border-b border-gray-200 last:border-b-0"
        >
          <div className="flex justify-between">
            <p className="font-semibold">{review.reviewerName}</p>
            <p className="text-sm text-gray-500">{review.platform}</p>
          </div>
          <p className="text-gray-700">{review.reviewText}</p>
          <p
            className={`text-sm ${
              review.sentimentCategory === "Positive"
                ? "text-green-500"
                : review.sentimentCategory === "Negative"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            {review.sentimentCategory}
          </p>
        </div>
      ))}
    </div>
  </div>
);
