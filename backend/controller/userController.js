const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// Registered user
const register = async (req, res) => {
	try {
		let { email, password, passwordCheck, displayName, success } = req.body

		// validate
		if (!email || !password || !passwordCheck)
			res.status(400).json({
				msg: 'Не все поля были заполнены.',
			})

		if (password.length < 5) {
			res.status(400).json({
				msg: 'Длина пароля должна быть более 5 символов',
				success: false,
			})
		}

		if (password !== passwordCheck)
			res.status(400).json({
				msg: 'Пароли не совпадают',
				success: false,
			})

		const existingUser = await User.findOne({
			email: email,
		})

		if (existingUser)
			res.status(400).json({
				msg: 'Аккаунт с таким email уже существует',
				success: false,
			})

		if (!displayName) displayName = email

		// шифрование паролей на бэк
		const salt = await bcrypt.genSalt()
		const passwordHash = await bcrypt.hash(password, salt)

		// создание нового юзера
		const newUser = new User({
			email,
			password: passwordHash,
			displayName,
			success: true,
		})

		// сохранение нового юзера
		const savedUser = await newUser.save()
		res.json(savedUser)
	} catch (error) {
		res.status(500).json({
			error: error.message,
		})
	}
}
// Log in user
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		// validate email и password
		if (!email || !password) {
			return res.status(400).json({
				msg: 'Не все поля были заполнены.',
				success: false,
			})
		}

		// Поиск по email
		const user = await User.findOne({
			email: email,
		})

		// Если такого юзера нету
		if (!user) {
			res.status(400).json({
				msg: 'Аккаунт с этим адресом электронной почты не был зарегистрирован',
				success: false,
			})
		}

		// Несовпадение пароля
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			res.status(400).json({
				msg: 'Неверные учетные данные',
				success: false,
			})
		}
		// Token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

		// Отправка на фронт данных
		res.json({
			token,
			success: true,
			id: user._id,
			displayName: user.displayName,
			email: user.email,
		})
	} catch (error) {
		res.status(500).json({
			error: error.message,
			success: false,
		})
	}
}

// Delete user
const delete_user = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.user._id)
		res.json(deletedUser)
	} catch (error) {
		res.status(500).json({
			error: error.message,
		})
	}
}

// Verification token
const valid_token = async (req, res) => {
	try {
		const token = req.header('x-auth-token')
		if (!token) res.json(false)

		const verified = jwt.verify(token, process.env.JWT_SECRET)
		if (!verified) res.json(false)

		const user = await User.findById(verified.id)
		if (!user) res.json(false)

		return res.json(true)
	} catch (error) {
		res.status(500).json({
			error: error.message,
		})
	}
}

const get_current_user = async (req, res) => {
	const user = await User.findById(req.user)
	console.log(req.user)
	res.json(user)
}

module.exports = {
	login,
	register,
	delete_user,
	valid_token,
	get_current_user,
}
