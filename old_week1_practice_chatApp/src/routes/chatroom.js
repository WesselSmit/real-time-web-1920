module.exports = (req, res) => {
	const userId = req.body.username

	res.render('chatroom', {
		userId
	})
}