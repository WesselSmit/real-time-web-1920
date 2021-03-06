import * as utils from './utils.mjs'

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
export function pr_pending(pr) {
	const pr_display = document.getElementById('pr-display')

	const card = document.createElement('article')
	card.classList.add('pr-card')
	card.setAttribute('pr-id', pr.id)
	pr_display.append(card)

	const name = document.createElement('h2')
	name.classList.add('pr-card-name')
	name.textContent = pr.sender
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

	return card
}


//Create PR review part 
export function createReviewSection(card) {
	const pr_review = document.createElement('div')
	pr_review.classList.add('pr-review')
	card.append(pr_review)

	const acceptButton = document.createElement('button')
	acceptButton.classList.add('pr-accept')
	acceptButton.textContent = "Accept"
	pr_review.append(acceptButton)

	const declineButton = document.createElement('button')
	declineButton.classList.add('pr-decline')
	declineButton.textContent = "Decline"
	pr_review.append(declineButton)

	return [acceptButton, declineButton]
}


export function getPRstatus(status) {
	return (status === "Accept") ? "accepted" : "declined"
}


export function pr_reviewed(pr) {
	const card = pr_pending(pr)
	const status = pr.status
	card.classList.add(`${status}`)
}



export function snippetCard(snippet, keyword) {
	const pr_display = document.getElementById('pr-display')

	const card = document.createElement('div')
	card.classList.add('syntax-snippet')
	pr_display.append(card)

	const syntaxKeyword = document.createElement('h3')
	syntaxKeyword.textContent = keyword
	card.append(syntaxKeyword)

	const snippetTitle = document.createElement('p')
	snippetTitle.textContent = "Syntax:"
	card.append(snippetTitle)

	const syntaxSnippet = document.createElement('pre')
	syntaxSnippet.textContent = snippet
	card.append(syntaxSnippet)

	utils.scrollDown(card)

	return card
}

//Remove all list-items from passed list
function removeList(list) {
	list.innerHTML = ""
}