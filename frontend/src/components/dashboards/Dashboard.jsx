import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { parse } from "papaparse";
import { v4 as uuidv4 } from "uuid";
import Modal from "../reviews/Modal";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [metrics, setMetrics] = useState({
    totalReviews: 0,
    avgSentiment: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const [notifications, setNotifications] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [csvReviews, setCsvReviews] = useState([]);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [aiResponse, setAiResponse] = useState("generating...");
  const [isLoading, setIsLoading] = useState(false);

  // Load seed data on component mount using Axios
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/seed")
      .then((response) => {
        const data = response.data;
        setReviews(data.reviews);
        calculateMetrics(data.reviews);
        generateNotifications(data.reviews);
        setFilteredReviews(data.reviews);
      })
      .catch((error) => console.error("Error loading seed data:", error));
  }, []);

  // Calculate metrics from reviews
  const calculateMetrics = (reviews) => {
    const totalReviews = reviews.length;
    const avgSentiment =
      reviews.reduce((sum, review) => sum + review.sentimentScore, 0) / totalReviews;
    const sentimentDistribution = reviews.reduce(
      (acc, review) => {
        acc[review.sentimentCategory]++;
        return acc;
      },
      { Positive: 0, Neutral: 0, Negative: 0 }
    );

    setMetrics({
      totalReviews,
      avgSentiment: parseFloat((avgSentiment * 100).toFixed(2)),
      positive: sentimentDistribution.Positive,
      neutral: sentimentDistribution.Neutral,
      negative: sentimentDistribution.Negative,
    });
  };

  // Generate notifications
  const generateNotifications = (reviews) => {
    const negativeReviews = reviews
      .filter((review) => review.sentimentCategory === "Negative")
      .slice(0, 5)
      .map((review) => ({
        id: review.reviewId,
        message: `New negative review from ${review.reviewerName} on ${review.platform}`,
        type: "alert",
      }));

    const pendingReviews = reviews
      .filter((review) => review.responseStatus === "Pending")
      .slice(0, 5)
      .map((review) => ({
        id: review.reviewId,
        message: `Response pending for review from ${review.reviewerName}`,
        type: "reminder",
      }));

    setNotifications([...negativeReviews, ...pendingReviews]);
  };

  // Handle CSV file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const processedReviews = results.data.map((row) => ({
            reviewId: uuidv4(),
            reviewerName: row.reviewerName || "Anonymous",
            platform: row.platform || "Manual Import",
            date: row.date || new Date().toISOString(),
            rating: row.rating || 3,
            reviewText: row.reviewText || "No review text provided.",
            sentimentScore: row.sentimentScore || 0,
            sentimentCategory: row.sentimentCategory || "Neutral",
            responseStatus: row.responseStatus || "Pending",
            verifiedPurchase: row.verifiedPurchase || false,
          }));

          setCsvReviews(processedReviews);
          setShowCsvModal(false);
          setTimeout(() => setShowCsvModal(true), 100);
          event.target.value = "";
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };

  // Handle notification click
  const handleNotificationClick = async (note) => {
    const review = reviews.find((r) => r.reviewId === note.id);
    if (review) {
      setSelectedNotification(review);
      setShowNotificationModal(true);
      setIsLoading(true);

      try {
        const response = await axios.post("http://localhost:5001/api/airesponse/generate-response", {
          reviewText: review.reviewText,
        });

        setAiResponse(response.data.response);
      } catch (error) {
        console.error("Error generating AI response:", error);
        setAiResponse("Failed to generate response. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle clearing a notification
  const handleClearNotification = (reviewId) => {
    setNotifications((prev) => prev.filter((note) => note.id !== reviewId));
    setReviews((prev) =>
      prev.map((review) =>
        review.reviewId === reviewId
          ? { ...review, responseStatus: "Handled" }
          : review
      )
    );
    setShowNotificationModal(false);
    setAiResponse("");
  };

  // Handle submitting a response
  const handleSubmitResponse = (type) => {
    if (selectedNotification) {
      setReviews((prev) =>
        prev.map((review) =>
          review.reviewId === selectedNotification.reviewId
            ? {
                ...review,
                responseStatus: type === "generated" ? "Generated Response" : "Personalized Response",
                responseText: aiResponse, // Use the edited AI response
              }
            : review
        )
      );
      setNotifications((prev) =>
        prev.filter((note) => note.id !== selectedNotification.reviewId)
      );
      setShowNotificationModal(false);
    }
    setAiResponse("");
  };

  // Sentiment trend data for Recharts
  const sentimentTrendData = Array.from({ length: 30 }, (_, i) => ({
    name: `Day ${i + 1}`,
    sentiment: Math.random() * 100, // Replace with actual data
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white shadow-md p-4 rounded-md mb-6 flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <label className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
          Import Reviews
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-4 rounded-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Reviews</h2>
          <p className="text-3xl font-bold">{metrics.totalReviews}</p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Average Sentiment
          </h2>
          <p className="text-3xl font-bold text-green-500">
            {metrics.avgSentiment}%
          </p>
        </div>

        <div className="bg-white shadow-md p-4 rounded-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Sentiment Breakdown
          </h2>
          <p className="text-green-500 font-bold">Positive: {metrics.positive}</p>
          <p className="text-yellow-500 font-bold">Neutral: {metrics.neutral}</p>
          <p className="text-red-500 font-bold">Negative: {metrics.negative}</p>
        </div>
      </div>

      {/* Sentiment Trend Chart */}
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

      {/* Notifications */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Recent Notifications
        </h2>
        <div className="bg-white shadow-md p-4 rounded-md">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <div
                key={note.id}
                className={`p-2 border-l-4 ${
                  note.type === "alert"
                    ? "border-red-500 text-red-600"
                    : "border-yellow-500 text-yellow-600"
                } bg-gray-50 mb-2 rounded-md cursor-pointer`}
                onClick={() => handleNotificationClick(note)}
              >
                {note.message}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notifications at this time.</p>
          )}
        </div>
      </div>

      {/* Review Feed */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Recent Reviews
        </h2>
        <div className="bg-white shadow-md p-4 rounded-md">
          {filteredReviews.slice(0, 10).map((review) => (
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

      {/* CSV Modal */}
      <Modal
        title="Imported Reviews"
        show={showCsvModal}
        onClose={() => setShowCsvModal(false)}
        size="xl"
      >
        <div className="space-y-4">
          {csvReviews.map((review) => (
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

      {/* Notification Modal */}
      <Modal
        title="Respond to Review"
        show={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        size="lg"
      >
        {selectedNotification && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold">Review Details</h3>
              <p className="text-gray-700">{selectedNotification.reviewText}</p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Reviewer:</span>{" "}
                {selectedNotification.reviewerName}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Platform:</span>{" "}
                {selectedNotification.platform}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Rating:</span>{" "}
                {"★".repeat(selectedNotification.rating)}
                {"☆".repeat(5 - selectedNotification.rating)}
              </p>
            </div>

        {/* AI-Generated Response */}
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

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleClearNotification(selectedNotification.reviewId)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Clear Notification
              </button>
              <button
                onClick={() => handleSubmitResponse("generated")}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit Generated Response
              </button>
              <button
                onClick={() => handleSubmitResponse("personalized")}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Submit Personalized Response
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
