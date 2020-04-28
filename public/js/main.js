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




//PR variables
const pr_input_container = document.getElementById('pr-input-container')
const pr_reference = document.getElementById('pr-reference')
const pr_suggestion = document.getElementById('pr-suggestion')
const pr_toggle = document.getElementById('pr-toggle')
const pr_submit = document.getElementById('pr-submit')

//Make selection on mouse activity
document.addEventListener('mouseup', () => {
	const selection = sourceCode.getSelection()

	if (!pr_input_container.classList.contains('hidden')) {
		pr_reference.textContent = selection
	}
})

//Toggle PR menu
pr_toggle.addEventListener('click', () => {
	const pr_toggle_container = document.getElementById('pr-toggle-container')

	//Toggle menu options (minimized - maximized)
	pr_toggle_container.classList.toggle('minimized')
	pr_toggle_container.classList.toggle('maximized')

	//Toggle menu interface (hidden - shown)
	pr_input_container.classList.toggle('hidden')
	if (pr_input_container.classList.contains('hidden')) {
		update.resetPR()
	}
})








const debounceTime = 250

//Emitting socket events:

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


//Submit PR (if not empty)
pr_submit.addEventListener('click', e => {
	e.preventDefault()

	const reference = pr_reference.value
	const suggestion = pr_suggestion.value

	const pr_submit_warning = document.getElementById('pr-submit-warning')

	//Check if all required inputs are answered
	if (reference === "" || suggestion === "") {
		pr_submit_warning.classList.remove('hidden')
	} else {
		pr_submit_warning.classList.add('hidden')

		const uid = utils.generateUID()
		const doc = sourceCode.getDoc()
		const coords = {
			from: sourceCode.getCursor(true),
			to: sourceCode.getCursor(false)
		}

		socket.emit('pull-request-submit', info, coords, suggestion)
	}
})





//Overwrite code selection
// const overwriteButton = document.getElementById('overwrite')

// // overwriteButton.addEventListener('click', () => update.pullRequest(sourceCode))

// overwriteButton.addEventListener('click', () => {
// 	const doc = sourceCode.getDoc()
// 	const coords = {
// 		from: sourceCode.getCursor(true),
// 		to: sourceCode.getCursor(false)
// 	}

// 	// doc.replaceRange("poep", coords.from, coords.to)

// 	// update.pullRequest(sourceCode)


// 	const suggestionInput = document.getElementById('suggestion')
// 	const suggestion = suggestionInput.value

// 	socket.emit('1', info, coords, suggestion)
// })

// socket.on('2', (coords, suggestion) => {
// 	const doc = sourceCode.getDoc()

// 	console.log(coords, suggestion)

// 	doc.replaceRange(suggestion, coords.from, coords.to)
// })



//Receiving socket events:

//Update rooms
socket.on('room-list', rooms => update.roomList(rooms, info.room))


//Update users
socket.on('user-list', users => update.userList(users, info.user, info.host))


//Update Code
socket.on('update-code', code => update.sourceCode(code, sourceCode))


//Update Pull-Request (pending)
socket.on('pull-request-pending', (coords, suggestion) => {
	const doc = sourceCode.getDoc()

	console.log("received: ", coords, suggestion)

	doc.replaceRange(suggestion, coords.from, coords.to)
})