import React from 'react';

export const TopPanel = props => {

	return (
		<div id={'top-panel'}>
			<div>Confirmed cases in GTA</div>

			<button
				style={{
					...styles.btn,
					backgroundColor: props.changingDate ? '#c9c9c9' : '#c73e3a',
					cursor: props.playing === 1 ? 'progress' : 'pointer',
				}}
				onClick={props.toggleCalender}
			>{props.currentDate}</button>

			<button style={styles.btn} onClick={props.onPlayBtn}>{props.playing === 0 ? 'Play' : (props.playing === 1 ? 'Pause' : 'Continue')}</button>

		</div>
	);
};

const styles = {
	btn: {
		backgroundColor: '#c73e3a',
		color: 'white',
		padding: 5,
		borderRadius: 7,
		borderWidth: 1,
	}
};