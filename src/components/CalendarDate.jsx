import React from 'react';
import PropTypes from 'prop-types';
import {PickerContext, zeroPad} from 'api/helper.js';

function inMouth(target, input) {
	return target.year === input.year &&
    	   target.month === input.month;
}

function isToday(today, input) {
	return today.year === input.year &&
    	   today.month === input.month &&
    	   today.day === input.day;
}

function isHighlighted(base = new Date(), input) {
    const target = {
    	year: base.getFullYear(),
    	month: base.getMonth() + 1,
    	day: zeroPad(base.getDate(), 2)
    };

    return target.year === input.year &&
    	   target.month === input.month &&
    	   target.day === input.day;
}

export default class CalendarDate extends React.Component {
	static propTypes = {
		index: PropTypes.number,
		date_info: PropTypes.object,
		// handlePick: PropTypes.func,
	};
	static contextType = PickerContext;

	constructor(props) {
		super(props);

		this.DateType = this.DateType.bind(this);
	}

	DateType() {
		const {pickedDate, today} = this.context;
		const {date_info} = this.props;
		var base = new Date(`${pickedDate.year}-${zeroPad(pickedDate.month, 2)}-${zeroPad(pickedDate.day, 2)}`);

		return isHighlighted(base, date_info)
				? 'highlighted'
				: isToday(today, date_info) ? 'today' : '';
	}

	render() {
		const {currentDate, handlePick} = this.context;
		const {date_info, index} = this.props;

		let inlineClass = ['calendar-cell', 'calendar-date'];
		let inlineStyle = {
			'--color': inMouth(currentDate, date_info) ? '#333333' : '#dddddd',
            'borderBottom': (index + 1) / 7 <= 5 ? '2px solid #dddddd' : 'none',
            'borderRight': (index % 7) === 6 ? 'none' : '2px solid #dddddd',
		};

		inlineClass.push(this.DateType());

		return (
			<div style = {inlineStyle}
				 className = {inlineClass.join(' ')}
				 onClick = {() => {
				 	handlePick(date_info);
				 }}>
				{date_info.day}
			</div>
		);
	}
}
