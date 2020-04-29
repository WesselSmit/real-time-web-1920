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
if (info.user != info.host) {
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
			update.hidePRmenu()
		}
	})

	//Submit PR (if not empty)
	pr_submit.addEventListener('click', e => {
		e.preventDefault()

		const reference = pr_reference.value
		const suggestion = pr_suggestion.value

		const pr_submit_warning = document.getElementById('pr-submit-warning')
		const pr_message = document.getElementById('pr-message')

		//Check if all required inputs are answered
		if (reference === "" || suggestion === "") {
			pr_submit_warning.classList.remove('hidden')
		} else {
			pr_submit_warning.classList.add('hidden')

			const uid = utils.generateUID()
			const message = pr_message.value
			const coords = {
				from: sourceCode.getCursor(true),
				to: sourceCode.getCursor(false)
			}

			const pr = {
				coords,
				message,
				reference,
				suggestion,
				id: uid
			}

			update.resetPR()

			socket.emit('pull-request-submit', info, pr)
		}
	})
}







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








//Update rooms
socket.on('room-list', rooms => update.roomList(rooms, info.room))


//Update users
socket.on('user-list', users => update.userList(users, info.user, info.host))


//Update Code
socket.on('update-code', code => update.sourceCode(code, sourceCode))


//Update Pull-Request (pending)
socket.on('pull-request-pending', (sender, pr) => {
	const pr_pending_card = update.pr_pending(info, sender, pr)

	//If (user === host) also create a review part in the card
	if (info.host === info.user) {
		const reviewButtons = update.createReviewSection(pr_pending_card)
		reviewButtons.forEach(button => button.addEventListener('click', () => {

			//Update the status (accepted / declined color)
			const status = update.reviewPRstatus(pr_pending_card, button)

			//Emit review to server
			socket.emit('pull-request-review', info, pr.id, status)
		}))
	}
})