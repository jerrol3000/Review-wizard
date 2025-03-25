import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Modal from '../reviews/Modal'

export const ReviewModal = ({
  review,
  show,
  onClose,
  onClear,
  onSubmit,
  aiResponse,
  setAiResponse,
  isLoading,
}) => {
  const [responseType, setResponseType] = useState('generated');

  return (
    <Modal
      title="Respond to Review"
      show={show}
      onClose={onClose}
      size="lg"
    >
      {review && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold">Review Details</h3>
            <p className="text-gray-700">{review.reviewText}</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Reviewer:</span> {review.reviewerName}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Platform:</span> {review.platform}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Rating:</span>
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold">AI-Generated Response</h3>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <ClipLoader color="#4A90E2" size={35} />
              </div>
            ) : (
              <textarea
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={aiResponse}
                onChange={(e) => setAiResponse(e.target.value)}
                rows={3}
                placeholder="Edit the AI-generated response..."
              />
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => onClear(review.reviewId)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Clear Notification
            </button>
            <button
              onClick={() => onSubmit(responseType)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit {responseType === 'generated' ? 'Generated' : 'Personalized'} Response
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
