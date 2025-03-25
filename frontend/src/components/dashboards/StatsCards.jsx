import React from 'react';

export const StatsCards = ({ metrics }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white shadow-md p-4 rounded-md text-center">
      <h2 className="text-xl font-semibold text-gray-700">Total Reviews</h2>
      <p className="text-3xl font-bold">{metrics.totalReviews}</p>
    </div>

    <div className="bg-white shadow-md p-4 rounded-md text-center">
      <h2 className="text-xl font-semibold text-gray-700">Average Sentiment</h2>
      <p className="text-3xl font-bold text-green-500">{metrics.avgSentiment}%</p>
    </div>

    <div className="bg-white shadow-md p-4 rounded-md text-center">
      <h2 className="text-xl font-semibold text-gray-700">Sentiment Breakdown</h2>
      <p className="text-green-500 font-bold">Positive: {metrics.positive}</p>
      <p className="text-yellow-500 font-bold">Neutral: {metrics.neutral}</p>
      <p className="text-red-500 font-bold">Negative: {metrics.negative}</p>
    </div>
  </div>
);
