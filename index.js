require('dotenv').config()
const port = process.env.PORT || 3002
const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const chat = require('#modules/chat')

const router = {
	chatroom: require('#routes/chatroom')
}

//Set public folder for assets
app.use(express.static(path.join(__dirname + '/public')))


//Set sockets
chat(io)


//Set template engine & path to template folder
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');


//Routes
app.get('/', router.chatroom)


//Start server
server.listen(port, () => console.log(`App now listening on port ${port}`))