const data = require("#modules/data")

module.exports = (req, res) => {
	const room = req.body.room
	const user = req.body.username

	const language = data.getRoomLanguage(room)

	const users = data.getUsersInRoom(room)
	const rooms = data.getRooms()
	const host = data.getRoomHost(room)
	const info = {
		username: user,
		users,
		rooms,
		roomName: room,
		host,
		language
	}

	res.render(`${language}`, info)
}