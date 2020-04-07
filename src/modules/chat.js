const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers
} = require('#modules/users')
const format = require('#modules/format')

module.exports = (io) => {
	const botName = "ModeratorBot"

	//Listen to users connecting
	io.on('connection', socket => {
		socket.on('join room', ({
			username,
			room
		}) => {
			const user = userJoin(socket.id, username, room)

			//Join room
			socket.join(user.room)

			//Let you know you've joined
			socket.emit('announcement', format(botName, "You've joined the chat"))

			//Let others know you've joined
			socket.broadcast
				.to(user.room)
				.emit('announcement', format(botName, `${user.username} has joined the chat`))

			//Get user-list of all users in room
			io.to(user.room).emit('room users', {
				room: user.room,
				users: getRoomUsers(user.room)
			})
		})


		//Listen to chat messages
		socket.on('chat message', message => {
			const user = getCurrentUser(socket.id)

			//Let users see message
			io.to(user.room).emit('message', format(user.username, message))
		})


		//Listen to clients disconnecting
		socket.on('disconnect', () => {
			const user = userLeave(socket.id)

			if (user) {
				//Let others know you've left
				io.to(user.room).emit('announcement', format(botName, `${user.username} has left the chat`))

				//Get user-list of all users in room
				io.to(user.room).emit('room users', {
					room: user.room,
					users: getRoomUsers(user.room)
				})
			}
		})
	})
}