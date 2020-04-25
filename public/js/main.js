import * as utils from './modules/utils.mjs'

const user = document.getElementById('loggedInUser').textContent
const room = document.querySelector('.current-room').textContent
const host = document.querySelector('.user-host').textContent
const roomInfo = {
	user,
	room,
	host
}

console.log(roomInfo)


const editor = document.getElementById('editor')
const language = document.querySelector('[room-language]').getAttribute('room-language')
const mode = document.querySelector('[room-mode]').getAttribute('room-mode')

const sourceCode = CodeMirror.fromTextArea(editor, {
	mode,
	theme: "dracula",
	lineNumbers: true,
	lineWrapping: true,
	autoCloseTags: true
})







const debounceTime = 250

sourceCode.on('change', utils.debounce((editor) => {
	const editorCode = editor.getValue()
	console.log(editor, editorCode)
}, debounceTime))