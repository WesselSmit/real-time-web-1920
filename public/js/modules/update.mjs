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

	const pr_submit_warning = document.getElementById('pr-submit-warning')
	pr_submit_warning.classList.add('hidden')
}


//Hide PR menu
export function hidePRmenu() {
	document.getElementById('pr-toggle-container').classList.remove('maximized')
	document.getElementById('pr-toggle-container').classList.add('minimized')
}


//Create pending pr card & insert in DOM
export function pr_pending(info, sender, pr) {
	const pr_display = document.getElementById('pr-display')
	const maxRows = 3

	const card = document.createElement('article')
	card.classList.add('pr-card')
	pr_display.append(card)

	const name = document.createElement('h2')
	name.classList.add('pr-card-name')
	name.textContent = sender.user
	card.append(name)

	const id = document.createElement('p')
	id.classList.add('pr-card-id')
	id.textContent = pr.id
	card.append(id)

	const messageLabel = document.createElement('label')
	messageLabel.textContent = "Message"
	card.append(messageLabel)

	const message = document.createElement('textarea')
	message.setAttribute('rows', pr.message.split('\n').length)
	message.setAttribute('readonly', true)
	message.classList.add('pr-card-message')
	message.textContent = pr.message
	card.append(message)

	if (pr.message === "") {
		message.classList.add('hide')
		messageLabel.classList.add('hide')
	}

	const referenceLabel = document.createElement('label')
	referenceLabel.textContent = "Reference"
	card.append(referenceLabel)

	const referenceLines = document.createElement('span')
	referenceLines.textContent = ` (referenced lines: ${pr.coords.from.line + 1} - ${pr.coords.to.line + 1})`
	referenceLabel.append(referenceLines)

	const reference = document.createElement('textarea')
	reference.setAttribute('rows', pr.reference.split('\n').length)
	reference.setAttribute('readonly', true)
	reference.classList.add('pr-card-reference')
	reference.textContent = pr.reference
	card.append(reference)

	const suggestionLabel = document.createElement('label')
	suggestionLabel.textContent = "Suggestion"
	card.append(suggestionLabel)

	const suggestion = document.createElement('textarea')
	suggestion.setAttribute('rows', pr.suggestion.split('\n').length)
	suggestion.setAttribute('readonly', true)
	suggestion.classList.add('pr-card-suggestion')
	suggestion.textContent = pr.suggestion
	card.append(suggestion)

	//If (user === host) also create a review part in the card
	if (info.host === info.user) {
		createReviewSection(card)
	}
}

//Create PR review part 
function createReviewSection(card) {
	const pr_review = document.createElement('div')
	pr_review.classList.add('pr-review')
	card.append(pr_review)

	const acceptButton = document.createElement('button')
	acceptButton.classList.add('pr-accept')
	acceptButton.textContent = "Accept"
	pr_review.append(acceptButton)
	acceptButton.addEventListener('click', () => reviewPR(true))

	const declineButton = document.createElement('button')
	declineButton.classList.add('pr-decline')
	declineButton.textContent = "Decline"
	pr_review.append(declineButton)
	declineButton.addEventListener('click', () => reviewPR(false))
}

function reviewPR(status) {
	console.log("review", status)
}

//Remove all list-items from passed list
function removeList(list) {
	list.innerHTML = ""
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