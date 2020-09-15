const Post = require('../models/postModels')

// find all posts
const post_index = async (req, res) => {
	try {
		if (req.user.role === 'admin') {
			// Показываем все статьи если роль admin
			const post = await Post.find()
			res.json(post)
		} else {
			// Показываем конкретную статью для каждого пользователя отдельно
			const userId = req.user._id
			const post = await Post.find({ user: userId })
			res.json(post)
		}
	} catch (error) {
		res.json({
			message: error,
		})
	}
}

// create post
const post_create_post = async (req, res) => {
	// req.body.user = req.body.id

	const post = new Post({
		title: req.body.title,
		description: req.body.description,
		user: req.user._id,
	})

	try {
		const save_post = await post.save()

		res.status(200).json(save_post)
	} catch (error) {
		res.json({
			message: error,
		})
	}
}

// Get find single Post
const post_details = async (req, res) => {
	try {
		const singlePost = await Post.findById(req.params.postId)
		res.json(singlePost)
	} catch (error) {
		res.json({
			message: error,
		})
	}
}

// delete post
const post_delete = async (req, res) => {
	try {
		const removePost = await Post.remove({
			_id: req.params.postId,
		})
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

const post_patch = async (req, res) => {
	try {
		const removePost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } })
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
	post_index,
	post_details,
	post_patch,
	post_create_post,
	post_delete,
}
