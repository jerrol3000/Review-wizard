import React from 'react';
import Modal from '../reviews/Modal';

export const ImportModal = ({ reviews, show, onClose }) => (
  <Modal
    title="Imported Reviews"
    show={show}
    onClose={onClose}
    size="xl"
  >
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.reviewId} className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
              <p className="text-sm text-gray-500">{review.platform}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
              <p
                className={`text-sm font-semibold ${
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
          </div>
          <div className="mt-2">
            <p className="text-gray-700">{review.reviewText}</p>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-gray-500">Rating:</span>
            <span className="ml-2 text-yellow-500">
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </span>
          </div>
        </div>
      ))}
    </div>
  </Modal>
);
