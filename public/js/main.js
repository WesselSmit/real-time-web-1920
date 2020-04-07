const socket = io()

const chat = document.getElementById('messagesContainer')
const roomNameEl = document.getElementById('roomName')
const userListEl = document.getElementById('userList')


//Join room
const username = document.getElementById('loggedInUser').value
const joinedRoom = "General"
socket.emit('join room', {
	username,
	room: joinedRoom
})



socket.on('room users', ({
	room,
	users
}) => {
	outputMenu(users)
})



socket.on('announcement', announcement => {
	outputMessage(announcement, "announcement")
})



socket.on('message', message => {
	outputMessage(message, "message")

	//Scroll down to new message
	chat.scrollTop = chat.scrollHeight
})


//Send message + fix small styling/UX things
const chatInput = document.getElementById('userInput')
chatInput.addEventListener('submit', e => {
	e.preventDefault()

	const msg = document.getElementById('userMessage')

	//Send message to server
	socket.emit('chatMessage', msg.value)

	//Clear input
	msg.value = ""

	//Focus input
	msg.focus()
})


//Show sent/received messages
function outputMessage(message, type) {
	const msgBlock = document.createElement('article')
	msgBlock.classList.add(`${type}`)
	chat.append(msgBlock)

	const msgMeta = document.createElement('h5')
	msgMeta.textContent = `${message.user} (${message.time})`
	msgBlock.append(msgMeta)

	const msgText = document.createElement('p')
	msgText.textContent = `${message.text}`
	msgBlock.append(msgText)

	if (message.user === username) {
		msgBlock.classList.add('you')
	}

	msgBlock.scrollIntoView({
		block: "end"
	})
}


//Show all users in chat
function outputMenu(users) {
	userListEl.innerHTML = `Users in ${users[0].room}: ${users.map(user => `<li>${user.username}</li>`).join("")}`
}