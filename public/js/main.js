const socket = io()

const chat = document.getElementById('messagesContainer')


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
	const paragraph = document.createElement('p')
	paragraph.textContent = message.user + ": " + message.text + " - (at: " + message.time + ")"

	chat.append(paragraph)
}