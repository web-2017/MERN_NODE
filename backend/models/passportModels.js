const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passportSchema = new Schema({
	fio: {
		type: String,
		required: true,
	},
	old_fio: {
		type: String,
		required: false,
		default: 'нет',
	},
	issued_by: {
		type: String,
		required: true,
	},
	date_of_issue: {
		type: String,
		required: true,
	},
	department_code: {
		type: String,
		required: true,
	},
	series_number: {
		type: String,
		required: true,
	},
	region: {
		type: String,
		default: 'РФ',
		required: true,
	},
	sex: {
		type: String,
		required: true,
	},
	birthday: {
		type: String,
		required: true,
	},
	place_birth: {
		type: String,
		required: true,
	},
	registration: {
		type: String,
		required: true,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	photo: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
})

module.exports = Passport = mongoose.model('Passport', passportSchema)
