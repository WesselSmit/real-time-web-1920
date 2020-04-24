import * as utils from './modules/utils.mjs'

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
	console.log(editor, editor.getValue())
}, debounceTime))