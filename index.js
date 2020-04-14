require('dotenv').config()
const port = process.env.PORT || 3003
const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const communicator = require('#modules/communicator')



//Set public folder for assets
app.use(express.static(path.join(__dirname + '/public')))



//Set sockets
communicator(io)


//Set template engine & path to template folder
app.set('views', __dirname + '/src/views')
app.set('view engine', 'ejs')




app.get('/', (req, res) => res.send('Hello World'))



//Start server
server.listen(port, () => console.log(`App now listening on port ${port}`))