# Simple message board
A message board application made with React (fron-end) and Node (back-end)

## Start Application
 * First run `npm run setup` to install dependencies for both the server and client
 * Finally start both servers by running `npm start`
 * Application should automatically open a new tab in your browser, but just in case you can always navigate to `http://localhost:3000`

## API endpoints
 * back-end endpoints are running on port 5000, we have the following endpoints:

### GET endpoint for querying channels
 * GET http://localhost:5000/channels

### GET endpoint for querying channel’s messages
 * GET http://localhost:5000/messages/:channel

### PUT endpoint for submitting new messages to a channel
 * PUT http://localhost:5000/:channel

### GET endpoint to retrieve entire in-memory database
	* GET http://localhost:5000/all

## Run test
 * To run unit test for the server simply run `npm test`
 * To run unit test for run `npm run test-client`. This will run test in watch mode for the client so you must quit it by pressing `q` 
