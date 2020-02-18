import React from 'react';
import PropTypes from 'prop-types';
import DateHeader from 'components/DateHeader.jsx';
import DateGrid from 'components/DateGrid.jsx';

import {PickerContext,
		getPrevInfo,
		getNextInfo,
		zeroPad,
		THIS_YEAR,
		THIS_MONTH,
		THIS_DATE} from 'api/helper.js';
import 'decorations/styles.css';

export default class DatePicker extends React.Component {
	static propTypes = {

	};

	constructor(props) {
		super(props);

		this.state = {
			currentDate: {
				year: THIS_YEAR, 
				month: THIS_MONTH, 
				day: zeroPad(THIS_DATE, 2),
			},
			today: {
				year: THIS_YEAR,
                month: THIS_MONTH,
                day: zeroPad(THIS_DATE, 2),
			},
			pickedDate: { // selected date
                year: THIS_YEAR,
                month: THIS_MONTH,
                day: zeroPad(THIS_DATE, 2),
            },
						
		};
		this.handlePrev = this.handlePrev.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handlePick = this.handlePick.bind(this);
	}

	handlePrev() {
		const {currentDate} = this.state;
		const {prevMonth, prevYear} = getPrevInfo(currentDate.month, currentDate.year);

        this.setState((prevState, props) => ({
        	currentDate: {
        		...prevState.currentDate,
        		year: prevYear,
        		month: prevMonth,
        	},
        }));
	}

	handleNext() {
		const {currentDate} = this.state;
		const {nextMonth, nextYear} = getNextInfo(currentDate.month, currentDate.year);

        this.setState((prevState, props) => ({
        	currentDate: {
        		...prevState.currentDate,
        		year: nextYear,
        		month: nextMonth,
        	}
        }));
	}

	handlePick(newDate) {
        this.setState((prevState, props) => ({
        	currentDate: {
        		...prevState.currentDate,
        		year: newDate.year,
        		month: newDate.month,
        	},
        	pickedDate: {
        		...newDate
        	}
        }));
    }


	render() {
		const {currentDate, today, pickedDate} = this.state;
		const self = this;
		const contextValue = {
			currentDate,
			today,
			pickedDate,
			handlePrev: self.handlePrev,
			handleNext: self.handleNext,
			handlePick: self.handlePick,
		};

		return (
			<PickerContext.Provider value = {contextValue}>
				<div className = "calendar">
					<DateHeader />
					<DateGrid />
				</div>
			</PickerContext.Provider>			
		);
	}
}
