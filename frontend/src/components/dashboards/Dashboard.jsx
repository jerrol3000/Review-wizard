import React from "react";

const Dashboard = () => {
  // Sample data
  const stats = {
    totalReviews: 120,
    avgSentiment: 82, // Out of 100
    positive: 80,
    neutral: 25,
    negative: 15,
  };

  const notifications = [
    { id: 1, message: "New negative review from Alex B.", type: "alert" },
    { id: 2, message: "Response pending for review #104", type: "reminder" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-md mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Import Reviews
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-4 rounded-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Reviews</h2>
          <p className="text-3xl font-bold">{stats.totalReviews}</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Average Sentiment
          </h2>
          <p className="text-3xl font-bold text-green-500">{stats.avgSentiment}/100</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Sentiment Breakdown</h2>
          <p className="text-green-500 font-bold">Positive: {stats.positive}</p>
          <p className="text-yellow-500 font-bold">Neutral: {stats.neutral}</p>
          <p className="text-red-500 font-bold">Negative: {stats.negative}</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Recent Notifications</h2>
        <div className="bg-white shadow-md p-4 rounded-md">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <div
                key={note.id}
                className={`p-2 border-l-4 ${
                  note.type === "alert" ? "border-red-500 text-red-600" : "border-yellow-500 text-yellow-600"
                } bg-gray-50 mb-2 rounded-md`}
              >
                {note.message}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notifications at this time.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;