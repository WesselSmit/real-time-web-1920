const data = {
	rooms: []
}

module.exports = {
	addRoom,
	getRooms,
	joinRoom,
	getUsersInRoom,
	getRoomhost
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


//Let user join passed room
function joinRoom(roomName, user) {
	const matchingRoom = findRoomWithName(roomName)

	matchingRoom.users.push(user)
	return matchingRoom.users
}


//Get all users in passed room
function getUsersInRoom(roomName) {
	const matchingRoom = findRoomWithName(roomName)
	return matchingRoom.users
}


//Get host of passed room
function getRoomhost(roomName) {
	const matchingRoom = findRoomWithName(roomName)
	return matchingRoom.host
}





//Helper functions
function findRoomWithName(name) {
	return data.rooms.find(room => room.name === name)
}