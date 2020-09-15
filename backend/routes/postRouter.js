const router = require('express').Router()
const { auth } = require('../middleware/auth')
const { post_index, post_create_post, post_details, post_delete, post_patch } = require('../controller/postController')

// GET back all post
router
	.get('/', auth, post_index)
	// create post
	.post('/', auth, post_create_post)
	// get id post
	.get('/:postId', post_details)
	// delete id post
	.delete('/:postId', post_delete)
	// update  post
	.patch('/:postId', post_patch)

module.exports = router
