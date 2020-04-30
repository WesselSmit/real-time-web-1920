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

			//Send sourceCode to joined client
			const sourceCode = data.getRoomSourceCode(client.room)
			socket.emit('update-code', sourceCode)

			//Send all Pull-Requests from room to joined client
			const pullRequests = data.getRoomPullRequests(client.room)
			socket.emit('get-pull-requests', pullRequests)
		})



		//Host edits/writes code 
		socket.on('code-edit', (client, code) => {

			//Save sourceCode to server 
			data.saveSourceCode(client.room, code)

			//Send new code to everyone EXCEPT host
			socket.broadcast.to(client.room).emit('update-code', code)
		})



		//Pull-Request submitted by client
		socket.on('pull-request-submit', (client, pr) => {

			//Save PR to server
			data.savePullRequest(client.room, pr)

			//Send pull-request to ALL users in room (also host)
			io.in(client.room).emit('pull-request-pending', pr)
		})



		//Pull-Request reviewed by host
		socket.on('pull-request-review', (client, id, status) => {

			//Update the status of the pull request in data
			const pr = data.assignPullRequestStatus(client.room, id, status)

			//Send updated pull request object to ALL clients (also host)
			io.in(client.room).emit('pull-request-reviewed', pr)
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

				//Check if user reconnects within allowed time
				const allowedTime = 3000
				setTimeout(() => {
					if (data.getUsersInRoom(room).length < 1) { //Room is still empty
						data.deleteRoom(room)

						//Send updated room-list to everyone in all rooms
						const rooms = data.getRooms()
						io.emit('room-list', rooms)
					}
				}, allowedTime)
			} else {
				//Send updated  user-list to everyone in room
				const users = data.getUsersInRoom(room)
				io.to(room).emit('user-list', users)
			}
		})
	})
}