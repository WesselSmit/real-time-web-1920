//Update list of all rooms
export function roomList(rooms, currentRoom) {
	const roomList = document.getElementById('rooms-list')

	removeList(roomList)

	rooms.forEach(room => {
		const li = document.createElement('li')
		li.textContent = room.name
		roomList.append(li)

		if (room.name === currentRoom) {
			li.classList.add('current-room')
		}
	})
}


//Update list of all users
export function userList(users, currentUser, host) {
	const userList = document.getElementById('users-list')

	removeList(userList)

	users.forEach(user => {
		const li = document.createElement('li')
		li.textContent = user.name
		userList.append(li)

		if (user.name === currentUser) {
			li.classList.add('current-user')
		}

		if (user.name === host) {
			li.classList.add('host')
			li.innerHTML = li.textContent + "<span>" + "(host)</span>"
		}
	})
}



//Update source-code 
export function sourceCode(code, editor) {
	editor.setValue(code)
}









//Helper functions:

//Remove all list-items from passed list
function removeList(list) {
	list.innerHTML = ""
}