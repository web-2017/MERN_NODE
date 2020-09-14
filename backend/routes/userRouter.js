const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// auth middleware
const auth = require('../middleware/auth')
const test = require('../middleware/test')
// User Controllers
const { login, register, delete_user, valid_token, get_current_user } = require('../controller/userController')

// Routers
// register
router
	.post('/register', register)
	// login
	.post('/login', test, login)
	// delete
	.delete('/delete', auth, delete_user)
	// check is valid token
	.post('/tokenIsValid', valid_token)
	// current login user
	.get('/', get_current_user)

module.exports = router
