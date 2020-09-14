const mongoose = require('mongoose')
// set up mongoose

const connectDB = async () => {
	mongoose.connect(
		process.env.DB_CONNECTION,
		{
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(err) => {
			if (err) throw err
			console.log('Mongo DB connected')
		}
	)
}

module.exports = connectDB
