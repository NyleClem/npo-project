const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.listen(5050, () => {
  console.log("Server has started on port 5050");
});
