import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const SentimentTrendChart = () => {
  const sentimentTrendData = Array.from({ length: 30 }, (_, i) => ({
    name: `Day ${i + 1}`,
    sentiment: Math.random() * 100,
  }));

  return (
    <div className="mt-6 bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Sentiment Trends (Last 30 Days)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sentimentTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sentiment"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
