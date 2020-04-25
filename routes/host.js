const data = require("#modules/data")

module.exports = (req, res) => {
	const room = req.body.roomname
	const language = req.body.language
	const user = req.body.username

	data.addRoom(room, language, user)
	// data.joinRoom(room, user)

	const users = data.getUsersInRoom(room)
	const rooms = data.getRooms()
	const host = data.getRoomHost(room)
	const info = {
		username: user,
		users,
		rooms,
		roomName: room,
		host,
	}

	res.render(`${language}`, info)
}
