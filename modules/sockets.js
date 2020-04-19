module.exports = io => {

	//Client connects
	io.on('connection', socket => {

		//Emit to single client
		socket.emit('announcement', "Welcome to CodeExchange")

		//Emit to everyone EXCEPT single client
		socket.broadcast.emit('announcement', "A user has joined the room")


		//Client disconnects
		io.on('disconnect', () => {
			//Emit to everyone
			io.emit('announcement', "A user has left the chat")
		})




		//Listen for chatMessage
		socket.on('chatMessage', msg => {
			io.emit('message', msg)
		})
	})
}