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
	const pr_message = document.getElementById('pr-message')
	const pr_reference = document.getElementById('pr-reference')
	const pr_suggestion = document.getElementById('pr-suggestion')
	const pr_toggle = document.getElementById('pr-toggle')
	const pr_submit = document.getElementById('pr-submit')
	const minimumRows = 3

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

		//Check if all required inputs are answered
		if (reference === "" || suggestion === "") {
			pr_submit_warning.classList.remove('hidden')
		} else {
			pr_submit_warning.classList.add('hidden')
			pr_message.setAttribute('rows', minimumRows)
			pr_suggestion.setAttribute('rows', minimumRows)

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
				id: uid,
				sender: info.user
			}

			update.resetPR()

			socket.emit('pull-request-submit', info, pr)
		}
	})


	//Control the pr-input textarea row-sizes
	const pr_inputs = [pr_message, pr_suggestion]
	pr_inputs.forEach(input => {
		input.setAttribute('rows', minimumRows)

		input.addEventListener('input', () => {
			let rows = input.value.split('\n').length

			//Set minimum row size
			if (rows < minimumRows) {
				rows = minimumRows
			}

			if (input === pr_message) {
				input.setAttribute('rows', rows)
			} else if (input === pr_suggestion) {
				input.setAttribute('rows', rows)
			}
		})
	})
}





//JS Syntax search 
if (info.language === "javascript") {
	const searchButton = document.querySelector('#mdn-container input[type=submit]')

	searchButton.addEventListener('click', () => {
		const searchInput = document.getElementById('mdn-search').value

		socket.emit('syntax-lookup', info, searchInput)
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







//Update rooms list
socket.on('room-list', rooms => update.roomList(rooms, info.room))


//Update users list
socket.on('user-list', users => update.userList(users, info.user, info.host))


//Get Pull-Requests 
socket.on('get-pull-requests', pullRequests => {
	pullRequests.forEach(pr => {
		if (pr.hasOwnProperty('status')) {
			update.pr_reviewed(pr)
		} else {
			update.pr_pending(pr)
		}
	})

	//Scroll last pr-card into view
	const lastPRcard = document.querySelector('#pr-display > article:last-of-type')
	if (lastPRcard) {
		utils.scrollDown(lastPRcard)
	}
})


//Update Code
socket.on('update-code', code => update.sourceCode(code, sourceCode))


//Update Pull-Request (pending)
socket.on('pull-request-pending', pr => {
	const pr_pending_card = update.pr_pending(pr)

	//If (user === host) also create a review part in the card
	if (info.host === info.user) {
		const reviewButtons = update.createReviewSection(pr_pending_card)
		reviewButtons.forEach(button => button.addEventListener('click', () => {

			//Update the status (accepted / declined color)
			const status = update.getPRstatus(button.textContent)

			//Emit review to server
			socket.emit('pull-request-review', info, pr.id, status)
		}))
	}

	utils.scrollDown(pr_pending_card)
})


//Update Pull-Request (reviewed)
socket.on('pull-request-reviewed', pr => {
	const pr_card = document.querySelector(`[pr-id="${pr.id}"]`)
	const status = pr.status

	pr_card.classList.add(`${status}`)

	//Check if sourceCode should be overwritten
	if (status === "accepted") {
		const doc = sourceCode.getDoc()
		doc.replaceRange(pr.suggestion, pr.coords.from, pr.coords.to)

		//Update sourceCode for all clients who join later (and weren't in the room when the updated was triggered)
		const editorCode = sourceCode.getValue()
		socket.emit('code-edit', info, editorCode)
	}
})



//Update Syntax Snippets
socket.on('syntax-snippet', (requestor, snippet) => {
	console.log(requestor, snippet)
})