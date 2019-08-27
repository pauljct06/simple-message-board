const { channels: boardChannels }= require('../data/channel');
const messageService = require('../services/message');

getAll = (req, res) => {
	return res.status(200).send(boardChannels);
};

getChannels = (req, res) => {
	return res.status(200).send(Object.keys(boardChannels));
};


getMessages = (req, res) => {
	const channel = req.params.channel;

	if (!Object.keys(boardChannels).includes(channel)) {
		return res.status(400).send(new Error('Invalid channel!'));
	}

	const messages = messageService.getMessages(channel);

	return res.status(200).send(messages);
};

addMessage = (req, res) => {
	const channel = req.params.channel;
	const message = req.body.message;

	if (!Object.keys(boardChannels).includes(channel)) {
		return res.status(400).send(new Error('Invalid channel!'));
	}

	messageService.addMessage(channel, message);

	return res.status(204).send();
};

module.exports = {
	getChannels,
	getMessages,
	addMessage,
	getAll,
};
