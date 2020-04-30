import React from 'react';

export const TopPanel = props => {

	return (
		<div id={'top-panel'}>
			<div>Confirmed cases in GTA</div>

			<div style={{ backgroundColor: props.changingDate ? '#c9c9c9' : 'white', padding: 5, color: props.changingDate ? 'white' : 'black' }}>{props.currentDate}</div>

			<button style={{ backgroundColor: '#c73e3a', color: 'white', padding: 5, borderRadius: 7, borderWidth: 1 }} onClick={props.onPlayBtn}>{props.playing === 0 ? 'Play' : (props.playing === 1 ? 'Pause' : 'Continue')}</button>

		</div>
	);
};