const jwt = require('jsonwebtoken')
// const { canViewPost } = require('../permissions/posts')

const auth = async (req, res, next) => {
	try {
		const token = req.header('x-auth-token')
		if (!token) res.status(401).json({ msg: 'No auth token, authorization denied' })

		const verified = jwt.verify(token, process.env.JWT_SECRET)
		if (!verified) res.status(401).json({ msg: 'Token verification failed, auth denied' })

		const user = await User.findById(verified.id)

		// req.user = verified.id
		req.user = user
		next()
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// const authRole = (role) => {
// 	return (req, res, next) => {
// 		if (req.user.role !== role) {
// 			res.status(401).json({ msg: 'Not allowed' })
// 		}

// 		next()
// 	}
// }

// const authGetPosts = (req, res, next) => {
// 	if (!canViewPost(req.role, req.post)) {
// 		res.status(401).res.send('Post not found')
// 	}

// 	next()
// }

module.exports = {
	auth,
}
