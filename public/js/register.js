const nameInput = document.getElementById('username')
const languageInput = document.querySelectorAll('input[type=radio]')
const joinButton = document.querySelector('input[type=submit]')

const registerInputs = [nameInput, ...languageInput]
registerInputs.forEach(input => {
	input.addEventListener('input', () => checkIfFormComplete())
	input.removeAttribute('required')
})


joinButton.classList.add('hide')


function checkIfFormComplete() {
	let languageSelected = false

	languageInput.forEach(input => {
		if (input.checked) {
			languageSelected = true
		}
	})

	if (languageSelected && nameInput.value) {
		joinButton.classList.remove('hide')
	} else {
		joinButton.classList.add('hide')
	}
}