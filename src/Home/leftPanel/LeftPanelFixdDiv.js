import React from "react";

export const LeftPanelFixdDiv = props => {

	return (

		<div id={'top-left-fixed'}>

			<div className={'city-case spacefiller'}>
				<div className={'cityDiv'}>Whitchurch-Stouffville</div>
				<div>Case</div>
			</div>

			<input
				type="search"
				id="search"
				placeholder={"search city"}
				onChange={props.onSearch}
				value={props.searchKey}
				disabled={props.playing === 1}
			/>

		</div>
	);
};