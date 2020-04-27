const data = {
	rooms: []
}

module.exports = {
	addRoom,
	getRooms,
	joinRoom,
	leaveRoom,
	getUsersInRoom,
	getJoinedRoom,
	getRoomHost,
	getRoomLanguage,
	deleteRoom
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
function joinRoom(roomName, user, id) {
	const matchingRoom = findRoomWithName(roomName)
	const userObj = {
		name: user,
		id
	}

	matchingRoom.users.push(userObj)
	return matchingRoom.users
}


//Let user leave passed room
function leaveRoom(roomName, id) {
	const matchingRoom = findRoomWithName(roomName)

	const index = matchingRoom.users.findIndex(user => user.id === id)
	return matchingRoom.users.splice(index, 1)
}


//Get all users in passed room
function getUsersInRoom(roomName) {
	const matchingRoom = findRoomWithName(roomName)
	return matchingRoom.users
}


//Get room the user has joined
function getJoinedRoom(id) {
	const rooms = data.rooms
	let matchedRoom

	rooms.forEach(room => {
		const users = room.users
		users.forEach(user => {
			if (user.id === id) {
				matchedRoom = room
			}
		})
	})

	return matchedRoom.name
}


//Get host of passed room
function getRoomHost(roomName) {
	const matchingRoom = findRoomWithName(roomName)
	return matchingRoom.host
}


//Get language of passed room
function getRoomLanguage(roomName) {
	const matchingRoom = findRoomWithName(roomName)
	return matchingRoom.language
}


//Delete room
function deleteRoom(roomName) {
	const index = data.rooms.findIndex(room => room.name === roomName)
	return data.rooms.splice(index, 1)
}




//Helper functions
function findRoomWithName(name) {
	return data.rooms.find(room => room.name === name)
}