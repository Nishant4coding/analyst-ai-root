const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const generateSQLQuery = async (userInput, schema) => {
  const prompt = `
    The database schema is as follows:
    ${schema}
    User request: ${userInput}
    Write an SQL query to satisfy the request.
    `;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 150,
  });
  return response.data.choices[0].text.trim();
};

module.exports = { generateSQLQuery };
