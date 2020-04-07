const socket = io()

const chat = document.getElementById('messagesContainer')
const roomNameEl = document.getElementById('roomName')
const userListEl = document.getElementById('userList')
const roomListEl = document.getElementById('roomList')


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



socket.on('message', message => {
	console.log(message)

	outputMessage(message)
})


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

	//Scroll to new message
	chat.scrollTop = chat.scrollHeight
})


function outputMessage(message) {
	const msgBlock = document.createElement('article')
	msgBlock.classList.add('message')
	chat.append(msgBlock)

	const msgMeta = document.createElement('h5')
	msgMeta.textContent = `${message.user} (${message.time})`
	msgBlock.append(msgMeta)

	const msgText = document.createElement('p')
	msgText.textContent = `${message.text}`
	msgBlock.append(msgText)
}

function outputMenu(users) {
	userListEl.innerHTML = `Users in ${users[0].room}: ${users.map(user => `<li>${user.username}</li>`).join("")}`
}


function outputRoomNames(roomList) {
	roomList.rooms.forEach(room => {
		const li = document.createElement('li')
		li.textContent = room
		roomListEl.append(li)
	})
}