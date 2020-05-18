import Calendar from "react-calendar";
import React from "react";

export const Calender = props => {
	return (
		<div style={{ position: 'absolute', top: 80, paddingTop: 20, paddingRight: 40, paddingBottom: 20, paddingLeft: 10, zIndex: 300, background: 'white', width: 300, alignSelf: 'center',  alignItems: 'center'}}>

			<Calendar
				tileClassName={'calender-tile'}
				className={'calender'}
				minDate={ props.dates?.length ? new Date(props.dates[0].rawDate) : null}
				maxDate={props.dates?.length ? new Date(props.dates[props.dates.length - 1].rawDate) : null}
				onChange={props.onDateClicked}
			/>

		</div>
	)
};

