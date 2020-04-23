//Create particles for BG animation
const register = document.getElementById('register')
const particleContainer = document.createElement('div')

particleContainer.id = 'particle-container'
register.prepend(particleContainer)

for (let i = 0; i < 60; i++) {
	const ins = document.createElement('ins')

	ins.classList.add('particle')
	particleContainer.append(ins)
}






//Toggle between join-/create room interface
const joinInterface = document.getElementById('register-join')
const hostInterface = document.getElementById('register-host')

const roleContainer = document.getElementById('role-container')
const joinRoom = document.getElementById('join-role')
const createRoom = document.getElementById('host-role')

joinRoom.addEventListener('change', toggleInterface)
createRoom.addEventListener('change', toggleInterface)

function toggleInterface() {
	joinInterface.classList.toggle('hide')
	hostInterface.classList.toggle('hide')
}