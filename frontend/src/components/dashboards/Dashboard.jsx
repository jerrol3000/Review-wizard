import React, { useState } from 'react';
import axios from 'axios';
import { useReviews } from '../hooks/useReviews';
import { Header } from './Header';
import { StatsCards } from './StatsCards';
import { SentimentTrendChart } from './SentimentTrendChart';
import { NotificationsPanel } from './NotificationsPanel';
import { ReviewFeed } from './ReviewFeed';
import { ReviewModal } from './ReviewModal';
import { ImportModal } from './ImportModal';

export const Dashboard = () => {
  const {
    reviews,
    metrics,
    notifications,
    filteredReviews,
    csvReviews,
    handleFileUpload,
    setReviews,
    setNotifications,
  } = useReviews();

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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


  const handleSubmitResponse = (type) => {
    if (selectedNotification) {
      setReviews((prev) =>
        prev.map((review) =>
          review.reviewId === selectedNotification.reviewId
            ? {
                ...review,
                responseStatus: type === "generated" ? "Generated Response" : "Personalized Response",
                responseText: aiResponse,
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

  const handleCsvImport = (e) => {
    handleFileUpload(e);
    setShowCsvModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header onImport={handleCsvImport} />
      <StatsCards metrics={metrics} />
      <SentimentTrendChart />
      <NotificationsPanel
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />
      <ReviewFeed reviews={filteredReviews} />

      <ImportModal
        reviews={csvReviews}
        show={showCsvModal}
        onClose={() => setShowCsvModal(false)}
      />

      <ReviewModal
        review={selectedNotification}
        show={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        onClear={handleClearNotification}
        onSubmit={handleSubmitResponse}
        aiResponse={aiResponse}
        setAiResponse={setAiResponse}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Dashboard;
