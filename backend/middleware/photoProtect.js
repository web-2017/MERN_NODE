exports.photoUploadProtect = function (req, res, next) {

	if(!req.files || !req.files.photo) {
		return next()
	}
  
	const file  = req.files.photo

	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return	next(new ErrorResponse('Please upload an image file', 400))
	}

	// Check filesize
	if(file.size > process.env.MAX_FILE_UPLOAD) {
		return	next(new ErrorResponse(`Please upload an image less than ${Math.round(process.env.MAX_FILE_UPLOAD / 1024 / 1024)}mb`, 400))
	}
	return next()
}