import React, { Component } from 'react';
import Gmap from './Gmap';
import axios from "axios";
import { getDateString } from "../functions/functions";
import { baseUrl } from '../Constant';

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			historyCases: [],
			orderedDateList: {},
			cases:{},
			cityRefs: {},
			loadMap: false,
			mouseHoveredCity: '',
			polygons: null,
			markers: null,
			selectedDate:'',
			windowSize: null,

		}

	}

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

	setMouseHoveredCity = (mouseHoveredCity, isOverMap) => {

		if (this.state.polygons && (this.state.mouseHoveredCity !== mouseHoveredCity)) {
			// console.log('mouseHoveredCity' + mouseHoveredCity, this.state.polygons[mouseHoveredCity]);
			this.state.infowindows?.[mouseHoveredCity]?.open(this.state.gmap, this.state.markers[mouseHoveredCity]);
			this.state.infowindows?.[this.state.mouseHoveredCity]?.close();

			this.state.polygons[mouseHoveredCity] && this.state.polygons[mouseHoveredCity].setOptions({ fillOpacity: 0.5 });
			this.state.polygons[this.state.mouseHoveredCity] && this.state.polygons[this.state.mouseHoveredCity].setOptions({ fillOpacity: 0.7 });

			this.setState({ mouseHoveredCity });

		}

	};

	setMapRefs = mapRefs => {
		this.setState(mapRefs);
	};


	renderGmap = () => {

		return (
			<Gmap
				setMouseHoveredCity={this.setMouseHoveredCity}
				cases={this.state.historyCases?.[this.state.orderedDateList?.[this.state.selectedDate]]?.cases}
				mouseHoveredCity={this.state.mouseHoveredCity}
				setMapRefs={this.setMapRefs}
				maxCases={this.state.historyCases?.[this.state.orderedDateList?.[this.state.selectedDate]]?.orderedCities?.[0]?.cases}
				selectedDate={this.state.selectedDate}
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




