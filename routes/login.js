const data = require('#modules/data')

module.exports = (req, res) => {
	const rooms = data.getRooms()

	res.render('login', {
		rooms
	})
}