const moment = require('moment')

module.exports = (user, text) => {
	botName = "chatBot"
	return {
		user,
		text,
		time: moment().format('h:mm a')
	}
}