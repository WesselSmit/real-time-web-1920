const data = require('#modules/data')

module.exports = io => {

	//Client connects
	io.on('connection', socket => {


		socket.on('join-room', client => {

			//Join socketio room
			socket.join(client.room)

			//Join server room
			data.joinRoom(client.room, client.user)

			//Send room-list to everyone in room
			const rooms = data.getRooms()
			io.to(client.room).emit('room-list', rooms)

			//Send user-list to everyone in room
			const users = data.getUsersInRoom(client.room)
			io.to(client.room).emit('user-list', users)
		})








		// 	//Emit to single client
		// 	socket.emit('announcement', 'Welcome to CodeExchange')

		// 	//Emit to everyone EXCEPT single client
		// 	socket.broadcast.emit('announcement', 'A user has joined the room')

		// 	//Client disconnects
		// 	io.on('disconnect', () => {
		// 		//Emit to everyone
		// 		io.emit('announcement', 'A user has left the chat')
		// 	})

		// 	//Listen for chatMessage
		// 	socket.on('chatMessage', msg => {
		// 		io.emit('message', msg)
		// 	})
	})
}