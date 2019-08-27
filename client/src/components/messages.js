import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import '../App.css';

class Messages extends Component {
  render() {
  	const { messages } = this.props;
  	let id = 1;

		return (
			<Card border="success" className="Card">
			  <Card.Header>Messages</Card.Header>
			  <Card.Body id="card-body">
					<ul id="card-list" className="list-group messages">
						{ messages.map((message) => <li key={id++}>{message}</li>) }
					</ul>		      
			  </Card.Body>
			</Card>
		);
	}
}

export default Messages;
