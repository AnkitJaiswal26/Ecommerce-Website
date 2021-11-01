const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "./config/config.env") });
const stripe = require("stripe")(process.env.STRIPE_KEY);
const querystring = require("querystring");

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
const usersRoute = require("./routes/users.route");
const orderRoute = require("./routes/order.route");

// Routing
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/users", usersRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

// Payment Route

app.post("/api/create-checkout-session", async (req, res) => {
	const cart = req.body.cart;
	const line_items = cart.map((item) => ({
		price_data: {
			currency: "inr",
			product_data: {
				name: item.name,
				images: [item.image],
			},
			unit_amount: parseInt(item.price * 100),
		},
		quantity: item.qty,
	}));

	const qString = querystring.stringify({ products: JSON.stringify(cart) });

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: line_items,
		mode: "payment",
		success_url: "http://localhost:3000/success?" + qString,
		cancel_url: "http://localhost:3000/cart?status=cancelled",
	});
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({ id: session.id });
});

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
