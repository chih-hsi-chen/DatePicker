import React from 'react';
import PropTypes from 'prop-types';
import {PickerContext, MONTHS} from 'api/helper.js';

function Arrow(props) {
	let inlineClass = ['arrow'];

	inlineClass.push(props.dir);

	return (
		<PickerContext.Consumer>
			{picker => (
				<button className = {inlineClass.join(' ')}
						onClick = {props.handleClick}></button>
			)}
		</PickerContext.Consumer>		
	);
};

export default class DateHeader extends React.Component {
	static propTypes = {

	};
	static contextType = PickerContext;

	constructor(props) {
		super(props);
	}

	render() {
		const {month, year} = this.context.currentDate;
		const {handlePrev, handleNext} = this.context;
		const month_name = MONTHS[month - 1];

		return (
			<div className = "calendar-header">
				<Arrow dir = 'left' handleClick = {handlePrev}/>
				<div className = "calendar-month">
					{month_name} {year}
				</div>
				<Arrow dir = 'right' handleClick = {handleNext}/>
			</div>		
		);
	}
}