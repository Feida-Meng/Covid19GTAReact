import React, { Component } from 'react';

import upArrow from "../../../assets/images/redArrowUP.png";
import downArrow from "../../../assets/images/redArrowDown.png";

export class ScrollBtn extends Component {

	constructor(props) {

		super(props);

		this.state = {
			scrolling: false
		}
	}

	onMouseEnter = () => {

		this.setState({ scrolling: true}, this.onScroll);
	};


	onScroll = () => {

		// console.log('onScroll', this.state.scrolling);

		if(this.state.scrolling) {
			// this.props.cityListRef && this.props.cityListRef.current.scrollBy(0, this.props.down ? 10 : -10);
			this.props?.cityListRef?.current?.scrollBy({
				top: this.props.down ? 10 : -10,
				left: 0,
				behavior: 'smooth'
			});

			setTimeout(this.onScroll, 60);
		}
	};

	onMouseLeave = () => {
		this.setState({ scrolling: false});
	};

	render() {

		return (
			<div
				className={'arrow-div'}
			>
				<img
					src={this.props.down ? downArrow : upArrow}
					className={'arrow-image'}
					alt={`${this.props.down ? 'down' : 'up'} button`}
					onMouseDown={this.onMouseEnter} // mobile
					onMouseUp={this.onMouseLeave} // mobile
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}

				/>
			</div>
		);
	}



}