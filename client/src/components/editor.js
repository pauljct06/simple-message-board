import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';


class Editor extends Component {
	constructor(props) {
		super(props);
		console.log(this.props)
		this.state = {
			value: '',
			disabled: true,
		};
	}

	handleChange = (event) => {
		const value = event.target.value;
    
    this.setState({
    	value,
    	disabled: value.length === 0,
    });
  }

	handleSubmit = () => {
		const { addMessage } = this.props;
		const { channel, refreshChannel } = this.props;

		if (!channel) {
			alert('Please select a channel in order to post a message');
		} else {
			addMessage(this.state.value);
			refreshChannel(channel);
			this.setState({
				value: '',
				disabled: true,
			});
		}
	}

	render() {
		console.log('editor state', this.state);
		
		const { disabled } = this.state;

		return (
			<Card border="success" className="Card">
			  <Card.Header>Editor</Card.Header>
			  <Card.Body>
					<Form onSubmit={this.handleSubmit}>
					  <Form.Group controlId="message">
					    <Form.Control as="textarea" rows="2" value={this.state.value} onChange={this.handleChange} />
					  </Form.Group>
					    <Button variant="primary" disabled={disabled} type="submit">
			    			Submit
			  			</Button>
					</Form>		  
			  </Card.Body>
			</Card>
		);
	}
}

export default Editor;