import React from "react";
import { LeftPanelFixdDiv } from './LeftPanelFixdDiv';
import { CityList } from './CityList';
import { ScrollBtn } from './ScrollBtn'


const cityListRef = React.createRef();

export const LeftPanel = props => {

	return (
		<div id={'left-panel'} >

			<ScrollBtn
				cityListRef={cityListRef}
			/>

			<LeftPanelFixdDiv
				{ ...props.leftPanelFixdDiv }
			/>

			{props.renderCityList ?
				<CityList
					ref={cityListRef}
					{ ...props.cityListProps }
				/> : null
			}

			<ScrollBtn
				down
				cityListRef={cityListRef}
			/>

		</div>
	);
};
