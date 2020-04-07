const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
	getRooms
} = require('#modules/users')
const format = require('#modules/format')

module.exports = (io) => {
	const botName = "chatBot"

	//Run when a client connects
	io.on('connection', socket => {
		socket.on('join room', ({
			username,
			room
		}) => {
			const user = userJoin(socket.id, username, room)

			socket.join(user.room)

			//Emit message ONLY to joined user
			socket.emit('message', format(botName, "You've joined the chat"))

			//Broadcast-emit message to ALL users EXCEPT joined user 
			socket.broadcast
				.to(user.room)
				.emit('message', format(botName, `${user.username} has joined the chat`))

			io.to(user.room).emit('room users', {
				room: user.room,
				users: getRoomUsers(user.room)
			})

			io.to(user.room).emit('rooms', {
				rooms: getRooms()
			})
		})





		//Listen for chatmessages
		socket.on('chatMessage', message => {
			const user = getCurrentUser(socket.id)

			//Broadcast to all users
			io.to(user.room).emit('message', format(user.username, message))
		})



		//Runs when client disconnects
		socket.on('disconnect', () => {
			const user = userLeave(socket.id)

			if (user) {
				//Broadcast to all users
				io.to(user.room).emit('message', format(botName, `${user.username} has left the chat`))

				io.to(user.room).emit('room users', {
					room: user.room,
					users: getRoomUsers(user.room)
				})

				io.to(user.room).emit('rooms', {
					roomList: getRooms()
				})
			}
		})
	})
}