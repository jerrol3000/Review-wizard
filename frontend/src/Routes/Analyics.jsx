import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const placeholderData = [
  { month: "Jan", positive: 30, neutral: 10, negative: 5 },
  { month: "Feb", positive: 40, neutral: 15, negative: 10 },
  { month: "Mar", positive: 35, neutral: 12, negative: 7 },
  { month: "Apr", positive: 50, neutral: 20, negative: 15 },
  { month: "May", positive: 55, neutral: 25, negative: 12 },
];

const Analytics = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Review Analytics</h2>

      {/* Summary Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 text-green-700 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Positive Reviews</h3>
          <p className="text-3xl font-bold">250</p>
        </div>
        <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Neutral Reviews</h3>
          <p className="text-3xl font-bold">80</p>
        </div>
        <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Negative Reviews</h3>
          <p className="text-3xl font-bold">45</p>
        </div>
      </div>

      {/* Sentiment Trend Chart */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Sentiment Trend Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={placeholderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="positive" stroke="#34D399" strokeWidth={2} />
            <Line type="monotone" dataKey="neutral" stroke="#FBBF24" strokeWidth={2} />
            <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
