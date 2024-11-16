const express = require("express");
const {
  connectDatabase,
  queryDatabase,
} = require("../controllers/dbController");
const router = express.Router();

router.post("/connect", connectDatabase); // Connect to a database
router.post("/query", queryDatabase); // Query the database using GPT

// Test Route
router.post("/test-gpt", async (req, res) => {
  try {
    const { prompt } = req.body; // Accept a prompt from the request
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt || "Hello, world!",
      max_tokens: 100,
    });
    res.status(200).send({
      success: true,
      data: response.data.choices[0].text.trim(),
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
