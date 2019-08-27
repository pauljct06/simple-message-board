const { expect } = require('chai');
const proxyquire = require('proxyquire');

const messageService = require('../../lib/services/message');

describe('Message service', () => {
	let db;
	let messageService;

	before(() => {
		db = {
				sports: [],
				news: [],
				entertainment: [],
		};

		messageService = proxyquire('../../lib/services/message', {
			'../data/channel': { 
				channels: db,
			},
		});

	});

	after(() => {
		db = null;
	});

	it('should add message', () => {
		const channel = 'sports';
		const message = 'testMessage';

		messageService.addMessage(channel, message);

		expect(db[channel]).to.include(message);
	});

	it('should retrieve message', () => {
		const channel = 'sports';
		const actual = messageService.getMessages(channel);

		expect(actual).to.deep.equal(db[channel]);
	});
});
