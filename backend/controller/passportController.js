const Passport = require('../models/passportModels')

// find all posts
const passport_index = async (req, res) => {
	try {
		if (req.user.role === 'admin') {
			// Показываем все статьи если роль admin
			const passport = await Passport.find()
			res.json(passport)
		} else {
			// Показываем конкретную статью для каждого пользователя отдельно
			const userId = req.user._id
			const passport = await Passport.find({ user: userId })
			res.json(passport)
		}
	} catch (error) {
		res.json({
			message: error,
		})
	}
}

// create passport
const passport_create_post = async (req, res) => {
	try {
		// upload file
		const file = req.file
		// if file is not image return error
		if (!file.mimetype.startsWith('image')) {
			return res.status(400).json({ error: 'Please upload an image file' })
		}

		const passport = new Passport({
			user: req.user._id,
			fio: req.body.fio,
			old_fio: req.body.old_fio,
			issued_by: req.body.issued_by,
			date_of_issue: req.body.date_of_issue,
			department_code: req.body.department_code,
			series_number: req.body.series_number,
			region: req.body.region,
			sex: req.body.sex,
			photo: file,
			birthday: req.body.birthday,
			place_birth: req.body.place_birth,
			registration: req.body.registration,
		})

		const save_passport = await passport.save()
		res.status(200).json(save_passport)
	} catch (error) {
		res.json({
			message: error,
		})
	}
}

// delete passport
const passport_delete = async (req, res) => {
	try {
		const removePassport = await Passport.remove({
			_id: req.params.passportId,
		})
		res.json({
			msg: 'success removed passport',
			removePassport,
		})
	} catch (error) {
		res.json({
			message: error,
		})
	}
}

const passport_patch = async (req, res) => {
	try {
		const removePost = await Post.updateOne({ _id: req.params.passportId }, { $set: { fio: req.body.fio } })
		res.json({
			msg: 'success removed post',
			removePost,
		})
	} catch (error) {
		res.json({
			message: error,
		})
	}
}

module.exports = {
	passport_index,
	// passport_details,
	passport_patch,
	passport_create_post,
	passport_delete,
}
