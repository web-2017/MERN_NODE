const protect = async (req, res, next) => {
	try {
		if (req.user.role !== 'admin') {
			res.status(403).json({ error: 'Отказано в доступе', success: false })
		}
		next()
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
