const {
  connectPostgres,
  connectMySQL,
  connectMongoDB,
} = require("../config/db");
const { generateSQLQuery } = require("../utils/openai");

let activeConnection = null; // To store the database connection

// Connect to the database
const connectDatabase = async (req, res) => {
  const { dbType, credentials } = req.body;

  try {
    if (dbType === "postgres") {
      activeConnection = await connectPostgres(credentials);
    } else if (dbType === "mysql") {
      activeConnection = await connectMySQL(credentials);
    } else if (dbType === "mongodb") {
      await connectMongoDB(credentials.uri);
    }
    res.status(200).send({ message: "Database connected successfully!" });
  } catch (error) {
    res
      .status(500)
      .send({
        error: "Failed to connect to the database",
        details: error.message,
      });
  }
};

// Query the database
const queryDatabase = async (req, res) => {
  const { userInput, schema } = req.body;

  try {
    if (!activeConnection) {
      return res.status(400).send({ error: "No active database connection" });
    }

    // Generate SQL query using GPT
    const query = await generateSQLQuery(userInput, schema);

    // Execute the query
    let result;
    if (activeConnection.query) {
      // For SQL databases
      result = await activeConnection.query(query);
    } else {
      // For MongoDB
      // Add custom MongoDB query logic if needed
      result = { message: "MongoDB query execution not implemented yet." };
    }

    res.status(200).send({ query, result });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to execute query", details: error.message });
  }
};

module.exports = { connectDatabase, queryDatabase };
