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


//Clear PR reference/suggestion + hide menu
export function resetPR() {
	document.getElementById('pr-message').value = ""
	document.getElementById('pr-reference').textContent = ""
	document.getElementById('pr-suggestion').value = ""

	hidePRmenu()
}


//Hide PR menu
export function hidePRmenu() {
	document.getElementById('pr-toggle-container').classList.remove('maximized')
	document.getElementById('pr-toggle-container').classList.add('minimized')
}


//Overwrite code-selection
// export function pullRequest(sourceCode) {
// 	//Credits to: https://stackoverflow.com/questions/23733455/inserting-a-new-text-at-given-cursor-position

// 	const suggestionInput = document.getElementById('suggestion')

// 	const selection = sourceCode.getSelection()
// 	const suggestion = suggestionInput.value

// 	if (selection.length > 0) {
// 		sourceCode.replaceSelection(suggestion)
// 	} else {
// 		const doc = sourceCode.getDoc()
// 		const cursor = doc.getCursor()

// 		const pos = {
// 			line: cursor.line,
// 			ch: cursor.ch
// 		}

// 		doc.replaceRange(suggestion, pos)
// 	}
// }









//Helper functions:

//Remove all list-items from passed list
function removeList(list) {
	list.innerHTML = ""
}