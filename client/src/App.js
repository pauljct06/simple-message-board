import React, { Component }from 'react';
import './App.css';
import Navigation from './components/navigation';
import Messages from './components/messages';
import Editor from './components/editor';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channels: [],
			selectedChannel: '',
			messages: [],
		}
	}
	
	componentDidMount() {
		this.getChannels()
			.then((channels) => this.setState({ channels }))
			.catch((err) => console.log(err));
  }

  selectChannel = (channel) => {
  	this.getMessages(channel)
  		.then((messages) => this.setState( { selectedChannel: channel, messages }))
  		.catch((err) => console.log(err));
  }
  
  getChannels = async () =>{
  	const res = await fetch('/channels');
  	const body = await res.json();

  	if (res.status !== 200) {
  		throw Error(body.message);
  	}

  	return body;
  }

  getMessages = async (channel) => {
  	const res = await fetch(`/messages/${channel}`);
  	const body = await res.json();

  	if (res.status !== 200) {
  		throw Error(body.message);
  	}

  	return body;
  }

  addMessage = async (message) => {
  	try {
  		console.log('message is:', message);
  		console.log('channel is:', this.state.selectedChannel);
  		await fetch(`/${this.state.selectedChannel}`, {
		    method: 'PUT',
		    headers: { 'Content-Type': 'application/json' },
		    body: JSON.stringify({ message })
  		});
  	} catch(err) {
  		throw Error(err);
  	}
  }

  render() {
  	console.log('this.state:', this.state);
    return (
      <div id="App">
     		<Navigation channels={this.state.channels} select={this.selectChannel} />
				<br />
				<Messages messages={this.state.messages} />
				<br />
				<Editor addMessage={this.addMessage} channel={this.state.selectedChannel} refreshChannel={this.selectChannel} />
      </div>
    );
  }  
}

export default App;
