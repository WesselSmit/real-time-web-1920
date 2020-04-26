import * as update from './modules/update.mjs'
import * as utils from './modules/utils.mjs'

const socket = io()

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
})
const debounceTime = 250






//Emitting socket events:

//Join the room
socket.emit('join-room', info)


//Update source-code
sourceCode.on('change', utils.debounce(editor => {
	const editorCode = editor.getValue()
	console.log(editor, editorCode)
}, debounceTime))







//Receiving socket events:

//Update rooms
socket.on('room-list', rooms => update.updateRoomList(rooms, info.room))


//Update users
socket.on('user-list', users => update.updateUsersList(users, info.user))