var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet"); // Optional for security
const axios = require("axios"); // Include axios to make HTTP requests

dotenv.config();

const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(helmet()); // Optional for security

console.log(__dirname);

// Serving static files from the dist folder
app.use(express.static(path.join(__dirname, "dist")));

// Serve the main index.html
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Something went wrong!");
    }
  });
});

// POST Route to use TextRazor API for text analysis
app.post("/analyze", async (req, res) => {
  const { text } = req.body; // Extract the text to be analyzed from the request body

  if (!text) {
    return res.status(400).json({ error: "Text is required for analysis." }); // Handle missing text
  }

  try {
    // Make a POST request to TextRazor API
    const response = await axios.post(
      "https://api.textrazor.com", // TextRazor API endpoint
      new URLSearchParams({ text }), // URL-encoded payload (text to be analyzed)
      {
        headers: {
          "x-textrazor-key": process.env.API_KEY, // Your TextRazor API key from .env
          "Content-Type": "application/x-www-form-urlencoded", // Required for TextRazor API
        },
      }
    );

    const data = response.data.response;
    const sentiment = data.sentiment || {}; // Get sentiment data (if available)

    const polarity = sentiment.polarity || null; // Extract polarity (default to null if missing)
    const subjectivity = sentiment.subjectivity || null; // Extract subjectivity (default to null if missing)

    // Return only the relevant sentiment data to the client
    res.json({ polarity, subjectivity });
  } catch (error) {
    console.error(
      "Error with TextRazor API:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to analyze text." }); // Handle errors
  }
});

// Graceful shutdown (optional)
process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  server.close(() => {
    console.log("Closed out remaining connections.");
  });
});

const server = app.listen(8000, function () {
  console.log("Server listening on port 8000!");
});
