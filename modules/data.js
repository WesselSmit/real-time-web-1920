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
	deleteRoom,
	saveSourceCode,
	getRoomSourceCode,
	savePullRequest,
	getRoomPullRequests,
	getPullRequestById,
	assignPullRequestStatus
}


//Add a room to data
function addRoom(room, language, user) {
	const newRoom = {
		name: room,
		language,
		host: user,
		users: [],
		code: "",
		pullRequests: []
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


//Save passed code in data
function saveSourceCode(roomName, code) {
	const matchingRoom = findRoomWithName(roomName)
	matchingRoom.code = code
}


//Get code from room
function getRoomSourceCode(roomName) {
	const matchingRoom = findRoomWithName(roomName)
	return matchingRoom.code
}


//Save PR
function savePullRequest(roomName, pr) {
	const matchingRoom = findRoomWithName(roomName)

	matchingRoom.pullRequests.push(pr)
	return matchingRoom.pullRequests
}


//Get PR from room
function getRoomPullRequests(roomName) {
	const matchingRoom = findRoomWithName(roomName)
	return matchingRoom.pullRequests
}


//Get Pull Request by id
function getPullRequestById(room, id) {
	const matchingPullRequest = room.pullRequests.find(pr => pr.id === id)
	return matchingPullRequest
}


//Assign a status to PR 
function assignPullRequestStatus(roomName, id, status) {
	const matchingRoom = findRoomWithName(roomName)
	const pullRequest = getPullRequestById(matchingRoom, id)

	pullRequest.status = status
	return pullRequest
}



//Helper functions:

//Find room in data by name
function findRoomWithName(name) {
	return data.rooms.find(room => room.name === name)
}