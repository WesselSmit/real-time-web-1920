const data = require("#modules/data")

module.exports = (req, res) => {
	const room = req.body.roomname
	const language = req.body.language
	const user = req.body.username

	const rooms = data.getRooms()

	//Check if room exists, if the room exists the user joins the room instead of creating another one with the same name
	//This prevents users from host rooms with the same name & prevents hosts from accidentally adding a room on refresh
	const roomExists = rooms.some(roomInData => roomInData.name === room)
	if (!roomExists) {
		data.addRoom(room, language, user)
	}

	const users = data.getUsersInRoom(room)
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