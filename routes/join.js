const data = require('#modules/data')

module.exports = (req, res) => {
	const room = req.body.room
	const user = req.body.username

	data.joinRoom(room, user)

	const language = data.getRoomLanguage(room)

	const users = data.getUsersInRoom(room)
	const rooms = data.getRooms()
	const info = {
		users,
		rooms,
		roomName: room
	}

	res.render(`${language}`, info)
}