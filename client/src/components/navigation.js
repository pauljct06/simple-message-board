import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    const { channels, select } = this.props;
    let id = 0;

    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Channels</Navbar.Brand>
          <Nav className="mr-auto" variant="pills">
            { 
              channels.map((channel) => 
              <Nav.Link href={`#${channel}`} key={id++} eventKey={channel} onClick={() => select(channel)}>
                {channel.charAt(0).toUpperCase() + channel.slice(1)}
              </Nav.Link>) 
            }
          </Nav>
        </Navbar>   
      </div>		
  	);
  }
}

export default Navigation;
