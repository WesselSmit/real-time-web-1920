const data = require('#modules/data')

module.exports = (req, res) => {
	const room = req.body.roomname
	const language = req.body.language
	const user = req.body.username

	data.addRoom(room, language, user)

	data.joinRoom(room, user)

	console.log('all users in room:', data.getUsersInRoom(room))

	//TODO: render + join the created room
	// console.log("TODO: join the room you've created")
}