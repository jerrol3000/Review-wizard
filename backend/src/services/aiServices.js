const dotenv = require('dotenv');
const axios = require("axios");

dotenv.config();

async function generateResponse(reviewText) {
  try {
    const response = await axios.post(
      `${process.env.DEEPSEEK_BASE_URL}`,
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content: "You are a customer service representative. Generate a short, professional, and helpful response to the following customer review. Respond directly to the review without adding any headings, notes, explanations, or additional context. Keep the response to a single paragraph.",
          },
          { role: "user", content: reviewText },
        ],
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating response:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { generateResponse };
