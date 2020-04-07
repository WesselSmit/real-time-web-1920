module.exports = (req, res) => {
	const userId = req.body.username

	console.log(userId)

	res.render('chatroom')
}