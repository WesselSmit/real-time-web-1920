const editor = document.getElementById('editor')
const sourceCode = CodeMirror.fromTextArea(editor, {
	mode: "xml",
	theme: "dracula",
	lineNumbers: true,
	autoCloseTags: true
})

document.addEventListener('click', () => console.log(sourceCode))