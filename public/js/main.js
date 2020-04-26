import * as update from './modules/update.mjs'
import * as utils from './modules/utils.mjs'

const socket = io()

//Get the client info
const docInfo = document.getElementById('info')
const info = {
	user: docInfo.getAttribute('user-name'),
	room: docInfo.getAttribute('room-name'),
	host: docInfo.getAttribute('host-name'),
	language: docInfo.getAttribute('room-language'),
	mode: docInfo.getAttribute('room-mode')
}

//Init CodeMirror instance and set options
const editor = document.getElementById('editor')
const sourceCode = CodeMirror.fromTextArea(editor, {
	mode: info.mode,
	theme: 'dracula',
	lineNumbers: true,
	lineWrapping: true,
	autoCloseTags: true,
	readOnly: (info.user === info.host) ? false : true
})






//Emitting socket events:
const debounceTime = 250

//Join the room
socket.emit('join-room', info)


//Update source-code
sourceCode.on('change', utils.debounce((editor, change) => {
	//Check if the 'change' event was fired because of 'input' or the 'setValue' method 
	//(updating the sourceCode also fires fires the 'change' event, this causes infinite loops)
	if (change.origin === "+input") { //the 'change' event was fired through user-input
		const editorCode = editor.getValue()
		socket.emit('code-edit', info, editorCode)
	}
}, debounceTime))








//Receiving socket events:

//Update rooms
socket.on('room-list', rooms => update.roomList(rooms, info.room))


//Update users
socket.on('user-list', users => update.userList(users, info.user, info.host))


//Update Code
socket.on('update-code', code => update.sourceCode(code, sourceCode))