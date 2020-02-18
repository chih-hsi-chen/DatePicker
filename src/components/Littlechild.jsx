import React from 'react';
import PropTypes from 'prop-types';
import 'decorations/child.css';

export default class LittleChild extends React.Component {
	static propTypes = {

	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p>Hello World!!</p>
				<a className = "blue-link"
				   href = "https://google.com" 
				   target = "_blank"
				   rel = "noopener noreferrer">Click me.</a>
			</div>
		);
	}
}
