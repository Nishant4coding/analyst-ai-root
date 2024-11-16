const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbRoutes = require("./routes/dbRoutes");
require("dotenv").config();
const testRoutes = require("./routes/dbRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/test", testRoutes);

app.use("/api/db", dbRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
