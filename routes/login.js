const data = require('#modules/data')

module.exports = (req, res) => {
	const rooms = data.getRooms()

	console.log('rooms: ', rooms)

	res.render('login', {
		rooms
	})
}