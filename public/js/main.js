const socket = io()

const chat = document.getElementById('messagesContainer')


socket.on('message', message => {
	console.log(message)

	outputMessage(message)

	scrollDown()
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
})


function outputMessage(message) {
	const paragraph = document.createElement('p')
	paragraph.textContent = message.user + ": " + message.text + " - (at: " + message.time + ")"

	chat.append(paragraph)
}

function scrollDown() {
	chat.scrollTop = chat.scrollHeight
}