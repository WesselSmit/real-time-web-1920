const users = []
const rooms = []

function userJoin(id, username, room) {
	const user = {
		id,
		username,
		room
	}

	users.push(user)

	if (!rooms.includes(user.room)) {
		rooms.push(user.room)
	}

	return user
}


function getCurrentUser(id) {
	return users.find(user => user.id === id)
}


function userLeave(id) {
	const index = users.findIndex(user => user.id === id)

	if (index != -1) {
		return users.splice(index, 1)[0]
	}
}


function getRoomUsers(room) {
	return users.filter(user => user.room === room)
}



function getRooms() {
	return rooms
}

module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
	getRooms
}