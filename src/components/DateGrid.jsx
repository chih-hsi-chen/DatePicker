import React from 'react';
import PropTypes from 'prop-types';
import CalendarDate from 'components/CalendarDate.jsx';
import {PickerContext,
		initialCalendar,
		WEEKDAY} from 'api/helper.js';

// props: index, dayLabel
function CalendarDay(props) {
	let inlineStyle = {
		'borderRight': (props.index % 7) === 6 ? 'none' : '2px solid #0066cc',
	};
	return (
		<div style = {inlineStyle} className = "calendar-cell calendar-day">
			{props.dayLabel}
		</div>
	);
}

export default class DateGrid extends React.Component {
	static propTypes = {

	};
	static contextType = PickerContext;

	constructor(props) {
		super(props);

		this.state = {
			dates: initialCalendar(),
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const {month, year} = nextContext.currentDate;

		this.setState((prevState, props) => ({
			dates: initialCalendar(month, year),
		}));
	}

	render() {
		const {currentDate, today, pickedDate} = this.context; 
		const {dates} = this.state;

		let weekdayList = WEEKDAY.map((dayLabel, index) => (
				<CalendarDay key = {index}
							 index = {index}
							 dayLabel = {dayLabel} />
			));
		let allDays = dates.map((date, index) => (
				<CalendarDate key = {index}
							  index = {index}
							  date_info = {date}
							  currentDate = {currentDate}
							  today = {today}
							  pickedDate = {pickedDate} />
			));

		return (
			<div className = "calendar-grid">
				{weekdayList}
				{allDays}
			</div>
		);
	}
}
