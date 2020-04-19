console.log('test')

const socket = io()


//Join + leave announcements
socket.on('announcement', announcement => {
	console.log(announcement)
})

//Chat messages
socket.on('message', message => {
	console.log(message)
})



//Sending/receiving messages
const chatForm = document.querySelector('form')

chatForm.addEventListener('submit', e => {
	e.preventDefault()

	const userInput = document.querySelector('input[type=text]')
	const msg = userInput.value

	//Emit message to server
	socket.emit('chatMessage', msg)
})