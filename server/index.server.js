const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config({ path: path.join(__dirname,"./config/config.env") });

const app = express();

// Mongoose Connection
connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

app.use("/public", express.static(path.join(__dirname, "uploads")));

// Importing Routes
const authRoute = require("./routes/auth.route");
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");

// Routing
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
