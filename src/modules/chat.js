const format = require('#modules/format')


module.exports = (io) => {
	const botName = "chatBot"

	//Run when a client connects
	io.on('connection', socket => {
		//Emit message ONLY to joined user
		socket.emit('message', format(botName, 'Welcome to the chat!'))



		//Broadcast-emit message to ALL users EXCEPT joined user 
		socket.broadcast.emit('message', format(botName, 'A user has joined the chat'))



		//Listen for chatmessages
		socket.on('chatMessage', message => {
			//Broadcast to all users
			io.emit('message', format("USER", message))
		})



		//Runs when client disconnects
		socket.on('disconnect', () => {
			//Broadcast to all users
			io.emit('message', format(botName, 'A user has left the chat'))
		})
	})
}