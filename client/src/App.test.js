import React from 'react';
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

import App from './App';
import Navigation from './components/navigation';
import Messages from './components/messages';
import Editor from './components/editor';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders App', () => {
  	const wrapper = shallow(<App />);

  	expect(wrapper).toMatchSnapshot();
  });	

  it('renders Navigation', () => {
  	const wrapper = shallow(
			<Navigation channels={['c1', 'c2', 'c3']} select="" />
  	);
  	
  	expect(wrapper).toMatchSnapshot();
  });

  it('renders Messages', () => {
  	const wrapper = shallow(
			<Messages messages={['message 1', 'message 2']} />
  	);
  	
  	expect(wrapper).toMatchSnapshot();
  });

  it('renders Editor', () => {
  	const wrapper = shallow(
			<Editor addMessage={'new message'} channel={'c1'} refreshChannel={() => {}} />
  	);
  	
  	expect(wrapper).toMatchSnapshot();
  });


  it('displays Navs correctly', () => {
  	const wrapper = mount(
			<Navigation channels={['c1']} select="" />
  	);
  	
  	const actual = wrapper.find('Nav').text();
  	const expected = 'C1';

  	expect(actual).toEqual(expected);
  });

  it('displays messages correctly', () => {
  	const wrapper = mount(
			<Messages messages={['message 1']} />
  	);
  	
  	const actual = wrapper.find('#card-list').text();
  	const expected = 'message 1';

  	expect(actual).toEqual(expected);
  });

  it('displays messages correctly', () => {
  	const wrapper = mount(
			<Editor addMessage={'new message'} channel={'c1'} refreshChannel={() =>{}} />
  	);
  	
  	const actual = wrapper.find('Editor').props();
  	const expectedMessage = 'new message';
  	const expectedChannel = 'c1';

  	expect(actual.addMessage).toEqual(expectedMessage);
  	expect(actual.channel).toEqual(expectedChannel);
  });     
});
