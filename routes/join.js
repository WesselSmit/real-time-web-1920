const data = require('#modules/data')

module.exports = (req, res) => {
	const room = req.body.room
	const user = req.body.username

	data.joinRoom(room, user)

	console.log('all users in room:', data.getUsersInRoom(room))
	console.log('host of room:', data.getRoomhost(room))


	//TODO: render + join the created room
	// res.render(`${room}`)
}