import * as utils from "./modules/utils.mjs"

const socket = io()

const docInfo = document.getElementById("info")
const user = docInfo.getAttribute("user-name")
const room = docInfo.getAttribute("room-name")
const host = docInfo.getAttribute("host-name")
const language = docInfo.getAttribute("room-language")
const mode = docInfo.getAttribute("room-mode")
const info = {
	user,
	room,
	host,
	language,
	mode
}





//Socket events:

//Join the room
socket.emit('join-room', info)







const editor = document.getElementById("editor")
// const mode = document.querySelector('[room-mode]').getAttribute('room-mode')

const sourceCode = CodeMirror.fromTextArea(editor, {
	mode,
	theme: "dracula",
	lineNumbers: true,
	lineWrapping: true,
	autoCloseTags: true,
})

const debounceTime = 250

sourceCode.on(
	"change",
	utils.debounce(editor => {
		const editorCode = editor.getValue()
		console.log(editor, editorCode)
	}, debounceTime)
)