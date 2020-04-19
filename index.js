require('dotenv').config()
const port = process.env.PORT || 3003
const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const sockets = require('#modules/sockets')

const router = {
	login: require('#routes/login'),
	room: require('#routes/room')
}


//Set public folder for assets
app.use(express.static(path.join(__dirname + '/public')))


//Allow data transfer through URLs
app.use(express.urlencoded({
	extended: true
}))

// TODO: inputs in login.ejs moeten NIET required zijn, in clientside JS moet je alleen de "join" button laten zien als er een username & language ingevuld is (de required pop-up is lelijk)

//Set sockets
sockets(io)

//Set template engine & path to template folder
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')



//Navigation (routes)
app.get('/', router.login)
app.post('/register', router.room)



//Start server
server.listen(port, () => console.log(`App now listening on port ${port}`))