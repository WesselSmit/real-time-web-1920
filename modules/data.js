const data = {
	rooms: []
}

module.exports = {
	addRoom: (room, language, user) => addRoom(room, language, user),
	getRooms: () => getRooms()
}


//Add a room to data
function addRoom(room, language, user) {
	const newRoom = {
		name: room,
		language,
		host: user,
		users: []
	}

	data.rooms.push(newRoom)
	return newRoom
}


//Get all existing rooms from data
function getRooms() {
	return data.rooms
}