const { Client } = require("pg");
const mysql = require("mysql2/promise");
const mongoose = require("mongoose");

// PostgreSQL Connection
const connectPostgres = async ({ host, port, user, password, database }) => {
  const client = new Client({ host, port, user, password, database });
  await client.connect();
  console.log("Connected to PostgreSQL");
  return client;
};

// MySQL Connection
const connectMySQL = async ({ host, port, user, password, database }) => {
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  });
  console.log("Connected to MySQL");
  return connection;
};

// MongoDB Connection
const connectMongoDB = async (uri) => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
};

module.exports = { connectPostgres, connectMySQL, connectMongoDB };
