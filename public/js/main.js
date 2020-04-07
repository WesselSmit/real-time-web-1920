const socket = io()

const chat = document.getElementById('messagesContainer')
const roomNameEl = document.getElementById('roomName')
const userListEl = document.getElementById('userList')
const userInput = document.getElementById('userMessage')
const instruction = document.querySelector('strong')

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
	socket.emit('chat message', msg.value)

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



userInput.addEventListener('input', e => {
	const commands = ["!help", "!random"]
	const input = e.target.value

	if (commands.some(command => input.includes(command))) {
		executeCommand(input)
	}
})


function executeCommand(command) {
	command = command.slice(1)

	if (command === "help") {
		explain()
	} else if (command === "random") {
		randomGif()
	}
	clearInput()
}

function explain() {
	const explanation = document.createElement('article')
	explanation.innerHTML = `<p>You can use hidden features by typing commands. List of commands: <br>
		- <strong>!random</strong> (shows a random gif)
		</p>
	`
	explanation.classList.add("announcement")
	chat.append(explanation)
}


function randomGif() {
	const msg = `het was de bedoeling dat hier een random gif gefetched werd en in de chat werd gezet. Maar het verkrijgen van een giphy api key kon niet omdat de ik elke keer een error kreeg dus had ik besloten dat het tijd was om naar bed te gaan en dit voor nu over te slaan. Als je dit leest dan heb ik dit dus niet afgemaakt...`
	console.log(msg)
	socket.emit('chat message', msg)
}


function clearInput() {
	userInput.value = ""
}


instruction.addEventListener('click', () => explain())