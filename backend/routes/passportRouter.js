const router = require('express').Router()
const { auth } = require('../middleware/auth')
const {
	passport_index,
	// passport_details,
	passport_patch,
	passport_create_post,
	passport_delete,
} = require('../controller/passportController')

// GET back all passport
router
	.get('/', auth, passport_index)
	// create passport
	.post('/', auth, passport_create_post)
	// get id passport
	// .get('/:passportId', auth, passport_details)
	// delete id passport
	.delete('/:passportId', auth, passport_delete)
	// update  passport
	.patch('/:passportId', auth, passport_patch)

module.exports = router
