import { useState, useEffect } from 'react';
import axios from 'axios';
import { parse } from 'papaparse';
import { v4 as uuidv4 } from 'uuid';

export const useReviews = () => {
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

  // Load seed data
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/seed");
        const data = response.data;
        setReviews(data.reviews);
        calculateMetrics(data.reviews);
        generateNotifications(data.reviews);
        setFilteredReviews(data.reviews);
      } catch (error) {
        console.error("Error loading seed data:", error);
      }
    };
    fetchReviews();
  }, []);

  // Calculate metrics
  const calculateMetrics = (reviews) => {
    const totalReviews = reviews.length;
    const avgSentiment = reviews.reduce((sum, review) => sum + review.sentimentScore, 0) / totalReviews;
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

  // Handle CSV import
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
          event.target.value = "";
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };

  return {
    reviews,
    metrics,
    notifications,
    filteredReviews,
    csvReviews,
    handleFileUpload,
    setReviews,
    setNotifications,
  };
};
