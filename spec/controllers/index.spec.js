const { expect } = require('chai');
const nock = require('nock');
const axios = require('axios');

describe('Endpoints', () => {
	let db;
	let BASE_URL = 'http://localhost:5000';

	before(() => {
		db = {
				sports: [],
				news: [],
				entertainment: [],
		};		
	});

	after(() => {
		db = null;
	})

	describe('GET /all', () => {
		before(() => {
			nock(BASE_URL)
				.get('/all')
				.reply(200, db);
		});

		it('should return in-memory database', async () => {
			const res = await axios.get(`${BASE_URL}/all`);
			const expected = {
				sports: [],
				news: [],
				entertainment: [],
			};

			expect(res.status).to.equal(200);
			expect(res.data).to.deep.equal(expected);
		});
	});

	describe('GET /channels', () => {
		before(() => {
			nock(BASE_URL)
				.get('/channels')
				.reply(200, Object.keys(db));
		});

		it('should return in only the channels names', async () => {
			const res = await axios.get(`${BASE_URL}/channels`);
			const expected = Object.keys(db);

			expect(res.status).to.equal(200);
			expect(res.data).to.deep.equal(expected);
		});	
	});

	describe('GET /messages/:channel', () => {
		before(() => {
			db.sports.push('message1', 'message2');
			const channels = Object.keys(db);

			for (const channel of channels) {
				nock(BASE_URL)
					.get(`/messages/${channel}`)
					.reply(200, db[channel]);
			}


			nock(BASE_URL)
				.get(uri => /channel|cars|sports/.test(uri) === false)
				.replyWithError('Invalid channel!');
		});

		it('should get all the messages for a channel', async () => {
			const channel = 'sports';
			const res = await axios.get(`${BASE_URL}/messages/${channel}`);
			const expected = db.sports;

			expect(res.status).to.equal(200);
			expect(res.data).to.deep.equal(expected);
		});

		it('should throw an error for an invalid channel', async () => {
			try {
				const channel = 'invalidChannel';
				const res = await axios.get(`${BASE_URL}/messages/${channel}`);
			} catch (err) {
				const expected = 'Invalid channel!';
				expect(err.message).to.equal(expected);
			}
		});
	});

	describe('PUT /:channel', () => {
		const message = 'testMessage';
		
		before(() => {
			const channels = Object.keys(db);

			for (const channel of channels) {
				nock(BASE_URL)
					.put(`/${channel}`, { message })
					.reply(204, (uri, body) => {
						const parsedBody = JSON.parse(body);
				    db[channel].push(parsedBody.message);
				  })
			}
		});

		it('should add new messages to a channel', async () => {
			const channel = 'entertainment';
			const res = await axios.put(`${BASE_URL}/${channel}`, { message });

			expect(res.status).to.equal(204);
			expect(db[channel]).to.include(message);
		})
	});
});