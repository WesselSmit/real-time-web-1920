const data = require('#modules/data')

module.exports = io => {

	//Client connects
	io.on('connection', socket => {

		//Client connects
		socket.on('join-room', client => {

			//Join socketio room
			socket.join(client.room)

			//Join server room
			data.joinRoom(client.room, client.user, socket.id)

			//Send room-list to everyone in all rooms
			const rooms = data.getRooms()
			io.emit('room-list', rooms)

			//Send user-list to everyone in room
			const users = data.getUsersInRoom(client.room)
			io.to(client.room).emit('user-list', users)


			//TODO: users die later connecten moeten meteen de sourceCode gestuurd krijgen
		})



		//Host edits/writes code 
		socket.on('code-edit', (client, code) => {
			//Send new code to everyone EXCEPT host
			socket.broadcast.to(client.room).emit('update-code', code)

			//TODO: code moet opgeslagen worden; nieuwe users moeten deze krijgen opgestuurd
		})



		//Client disconnects
		socket.on('disconnect', () => {

			//Find the room the user joined
			const room = data.getJoinedRoom(socket.id)

			//Leave socketio room
			socket.leave(room)

			//Leave server room
			data.leaveRoom(room, socket.id)

			//Remove room if it's empty
			const numberOfUsers = data.getUsersInRoom(room).length
			if (numberOfUsers < 1) { //Room is empty
				data.deleteRoom(room)

				//Send updated room-list to everyone in all rooms
				const rooms = data.getRooms()
				io.emit('room-list', rooms)
			} else {
				//Send updated  user-list to everyone in room
				const users = data.getUsersInRoom(room)
				io.to(room).emit('user-list', users)
			}
		})
	})
}