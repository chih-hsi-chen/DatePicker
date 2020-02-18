import React from 'react';

export const CALENDAR_WEEKS = 6;
export const THIS_YEAR = (new Date().getFullYear());
// one-based month
export const THIS_MONTH = (new Date().getMonth()) + 1;
export const THIS_DATE = new Date().getDate();

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const WEEKDAY = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

export const zeroPad = (value, length) => {
    return `${value}`.padStart(length, '0');
};

const isLeapYear = (year) => {
    if (year % 4 === 0) {
        if (year % 100 === 0 && year % 400 !== 0) {
            return false;
        }
        return true;
    }
    return false;
};

export const getPrevInfo = (month, year) => {
    return month === 1
        ? {prevMonth: 12, prevYear: year - 1}
        : {prevMonth: month - 1, prevYear: year};
};
export const getNextInfo = (month, year) => {
    return month === 12
        ? {nextMonth: 1, nextYear: year + 1}
        : {nextMonth: month + 1, nextYear: year};
};

const getMonthDays = (month, year) => {
    var months30 = [4, 6, 9, 11];
    var leapYear = isLeapYear(year);

    return month === 2
        ? leapYear ? 29 : 28
        : months30.includes(month) ? 30 : 31;
};

// one-based weekday
// 0->Sunday, 1->Monday ... etc
const getMonthFirstDay = (month, year) => {
    return (new Date(`${year}-${zeroPad(month, 2)}-01`).getDay());
};

export const initialCalendar = (month = THIS_MONTH, year = THIS_YEAR) => {
    // Get number of days in current month and first weekday number in month
    const monthDays = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);

    // Get number of days to be displayed from previous and next month
    // This will ensure that total 42 days are displayed on calendar
    const DaysFromPrevMonth = monthFirstDay === 0 ? 7 : monthFirstDay;
    const DaysFromNextMonth = (CALENDAR_WEEKS * 7) - (monthDays + DaysFromPrevMonth);

    // Get the previous and next month, year
    const {prevMonth, prevYear} = getPrevInfo(month, year);
    const {nextMonth, nextYear} = getNextInfo(month, year);

    // Get number of days in previous month
    const prevMonthDays = getMonthDays(prevMonth, prevYear);

    // Build dates to be displayed on calendar from prev month
    const prevMonthDates = [...new Array(DaysFromPrevMonth)].map((value, index) => {
        const day = index + 1 + (prevMonthDays - DaysFromPrevMonth);
        return {
            year: prevYear,
            month: prevMonth,
            day: zeroPad(day, 2)
        };
    });

    // Build dates to be displayed on calendar from current month
    const currentMonthDates = [...new Array(monthDays)].map((value, index) => {
        const day = index + 1;
        return {
            year: year,
            month: month,
            day: zeroPad(day, 2)
        };
    });

    // Build dates to be displayed on calendar from next month
    const nextMonthDates = [...new Array(DaysFromNextMonth)].map((value, index) => {
        const day = index + 1;
        return {
            year: nextYear,
            month: nextMonth,
            day: zeroPad(day, 2)
        };
    });

    return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
};

export const PickerContext = React.createContext({
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
    handlePrev: function() {
        console.log(this.constructor.name);
    },
    hanldeNext: function() {
        console.log(this.constructor.name);
    },
    handlePick: function() {
        console.log(this.constructor.name);
    }
});