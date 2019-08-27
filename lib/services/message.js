const { channels } = require('../data/channel');

const addMessage = (channel, message) => {
	channels[channel].push(message);
};

const getMessages = (channel) => {
	return channels[channel];
};

module.exports = {
	addMessage,
	getMessages,
};
