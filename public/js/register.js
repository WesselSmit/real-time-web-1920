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




const joinInterface = document.getElementById('register-join')
const hostInterface = document.getElementById('register-host')

//Toggle between join-/create room interface
const roleContainer = document.getElementById('role-container')
const joinRoom = document.getElementById('join-role')
const createRoom = document.getElementById('host-role')

joinRoom.addEventListener('change', toggleInterface)
createRoom.addEventListener('change', toggleInterface)

function toggleInterface() {
	joinInterface.classList.toggle('hide')
	hostInterface.classList.toggle('hide')
}





//Determine what interface to show
const availableRooms = joinInterface.getElementsByClassName('availableRoom')

if (!availableRooms.length > 0) { //No rooms available => show create-room interface
	joinInterface.classList.add('hide')
	hostInterface.classList.remove('hide')

	joinRoom.checked = false
	createRoom.checked = true
} else {
	joinInterface.classList.remove('hide')
	hostInterface.classList.add('hide')

	joinRoom.checked = true
	createRoom.checked = false
}