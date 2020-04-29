import React, { Component } from 'react';
import Gmap from './Gmap';

export default class Home extends Component {


	renderGmap = () => {

		return (
			<Gmap

			/>
		)
	};

	render() {

		return (
			<div
				style={{ height: '100%', width: '100%' }}
				id={'main'}
			>

				{this.renderGmap()}

			</div>
		);
	}

}




