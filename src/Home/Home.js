import React, { Component } from 'react';
import Gmap from './Gmap';
import axios from "axios";
import { getDateString } from "../../functions/functions";
import { baseUrl } from '../Constant';

export default class Home extends Component {

	async componentDidMount() {
		console.log('componentDidMount');

		try {
			await this.getTheLatestCases();

		} catch (e) {

			console.log('componentDidMount',e);
			console.log('componentDidMount',e.response)

		}

	}

	getTheLatestCases = async () => {

		const cityCases = await axios({ method: 'get', url: `${baseUrl}/covid19` });

		console.log('cityCases',cityCases);

		const historyCases = [];
		const orderedDateList = {};
		const cases = {};
		const orderedCities = [];
		const cityRefs = {};
		let createdAt = '';


		cityCases.data.data.data.forEach(city => {

			if (!createdAt) {
				createdAt = city.createdAt
			}

			cases[city.cityAndRegion] = city.cases;
			cityRefs[city.cityAndRegion] = React.createRef();
			orderedCities.push({ city: city.cityAndRegion, cases: city.cases });

		});


		const selectedDate = getDateString(createdAt);

		historyCases[0] = {};
		orderedDateList[selectedDate] = 0;
		historyCases[0].cases = cases;
		historyCases[0].orderedCities = orderedCities;
		historyCases[0].date = selectedDate;

		this.setState({ historyCases, cityRefs, selectedDate, orderedDateList });
	};


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




