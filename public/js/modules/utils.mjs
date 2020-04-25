export const debounce = (func, delay) => {
	//Credits to https://www.geeksforgeeks.org/debouncing-in-javascript/
	let debounceTimer
	return function () {
		const context = this
		const args = arguments
		clearTimeout(debounceTimer)
		debounceTimer = setTimeout(() => func.apply(context, args), delay)
	}
}