module.exports = (req, res) => {
	const room = req.body.room
	res.render(`${room}`)
}