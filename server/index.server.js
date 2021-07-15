const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = reuqire("morgan");
const helmet = reuqire("helmet");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

const app = express();

// Mongoose Connection
connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
