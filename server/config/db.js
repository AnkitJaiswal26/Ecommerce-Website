const mongoose = require("mongoose");

module.exports = connnectDB = async () => {
	try {
		const con = await mongoose.connect(process.env.MONGO_URL, {
			useCreateIndex: true,
			useFindAndModify: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
		});
		console.log(`MongoDB connnected: ${con.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
