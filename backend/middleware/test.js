const test = async (req, res, next) => {
	console.log('test', req.body)
	next()
}

module.exports = test
