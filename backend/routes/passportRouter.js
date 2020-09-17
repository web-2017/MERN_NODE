const router = require('express').Router()
const multer = require('multer')
const uploadPassport = multer({ dest: 'uploads/passport' })
const { auth } = require('../middleware/auth')
const {
	passport_index,
	// passport_details,
	passport_patch,
	passport_create_post,
	passport_upload_image,
	passport_delete,
} = require('../controller/passportController')

// GET back all passport
router
	.get('/', auth, passport_index)
	// create passport
	.post('/', auth, passport_create_post)
	// upload files
	.patch('/upload', auth, uploadPassport.single('image'), passport_upload_image)
	// get id passport
	// .get('/:passportId', auth, passport_details)
	// delete id passport
	.delete('/:passportId', auth, passport_delete)
	// update  passport
	.patch('/:passportId', auth, passport_patch)

module.exports = router
