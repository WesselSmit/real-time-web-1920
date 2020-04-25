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
	join: require('#routes/join'),
	host: require('#routes/host')
}


//Set public folder for assets
app.use(express.static(path.join(__dirname + '/public')))


//Allow data transfer through URLs
app.use(express.urlencoded({
	extended: true
}))

// TODO: join room gebeurt nu al in register maar moet dit niet pas op de pagina zelf op het 'connection' event?
// todo:       ^ zie de YT socketio tutorial over hoe je meerdere rooms kan implementeren

//Set sockets
sockets(io)

//Set template engine & path to template folder
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')



//Navigation (routes)
app.get('/', router.login)
app.post('/join', router.join)
app.post('/host', router.host)



//Start server
server.listen(port, () => console.log(`App now listening on port ${port}`))