import React from "react";

const Review = () => {
  const reviews = [
    {
      id: 1,
      reviewer: "John Doe",
      date: "Feb 18, 2025",
      rating: 5,
      text: "Great service! The team was very professional and responsive.",
      sentiment: "Positive",
      aiResponse: "Thank you, John! We're thrilled to hear that you had a great experience with our team."
    },
    {
      id: 2,
      reviewer: "Jane Smith",
      date: "Feb 15, 2025",
      rating: 3,
      text: "The product is good, but the delivery was delayed.",
      sentiment: "Neutral",
      aiResponse: "We appreciate your feedback, Jane. We apologize for the delay and will work on improving our delivery time."
    },
    {
      id: 3,
      reviewer: "Mike Johnson",
      date: "Feb 10, 2025",
      rating: 1,
      text: "Terrible experience. Customer service was unhelpful.",
      sentiment: "Negative",
      aiResponse: "We're sorry to hear that, Mike. Please reach out so we can resolve this issue for you."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h1>
      {reviews.map((review) => (
        <div key={review.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div>
              <h2 className="font-bold text-lg">{review.reviewer}</h2>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                review.sentiment === "Positive"
                  ? "bg-green-100 text-green-700"
                  : review.sentiment === "Neutral"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {review.sentiment}
            </span>
          </div>
          <p className="text-gray-700 mb-3">{review.text}</p>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-sm font-semibold text-gray-600">AI-Generated Response:</p>
            <p className="text-gray-700">{review.aiResponse}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
