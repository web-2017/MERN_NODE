const test = async(req, res, next) => {
  console.log(111, req.body);
  next()
}

module.exports = test