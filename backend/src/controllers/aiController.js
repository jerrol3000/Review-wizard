const express = require("express");
const router = express.Router();
const {generateResponse} = require("../services/aiServices");


exports.aiResponse = async (req, res) => {
  const { reviewText } = req.body;
  if(!reviewText){
    return res.status(400).json({ message: "Review text is required" });
  }

  try {
    const response = await generateResponse(reviewText);
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: "Error generating response", error });
  }
};

