import React, { Component } from 'react';
import Gmap from './Gmap';
import axios from "axios";
import { getDateString } from "../functions/functions";
import { baseUrl } from '../Constant';
import { LeftPanel } from './leftPanel';

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

			this.onResize();
			window.addEventListener("resize", this.onResize);
			await this.getTheLatestCases();

		} catch (e) {

			console.log('componentDidMount',e);
			console.log('componentDidMount',e.response)

		}

	}

	onResize = ()  => {

		// console.log('window?.innerWidth', window?.innerWidth);
		if (window?.innerWidth < 400) {
			// console.log();
			this.state.gmap?.setZoom(8);
		} else if (window?.innerWidth >= 400) {
			this.state.gmap?.setZoom(9.2);

		}

		this.setState({ windowWidth: (window?.innerWidth || 0), windowHeight: (window?.innerHeight || 0) });
	};

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
			isOverMap && this.scrollToCity(mouseHoveredCity);
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

		if (this.state.historyCases?.[this.state.orderedDateList?.[this.state.selectedDate]]?.cases) {

			// console.log('renderGmap');

			return (
				<Gmap
					setMouseHoveredCity={this.setMouseHoveredCity}
					cases={this.state.historyCases?.[this.state.orderedDateList?.[this.state.selectedDate]]?.cases}
					mouseHoveredCity={this.state.mouseHoveredCity}
					setMapRefs={this.setMapRefs}
					getPolygonsAndMarkers={{ polygons: this.state.polygons, markers: this.state.markers, gmap: this.state.gmap, infowindows: this.state.infowindows }}
					maxCases={this.state.historyCases?.[this.state.orderedDateList?.[this.state.selectedDate]]?.orderedCities?.[0]?.cases}
					selectedDate={this.state.selectedDate}
				/>
			)
		}
	};

	onSearch = e => {

		if (e.target.value) {
			const matchedCityList = this.state.historyCases[this.state.orderedDateList[this.state.selectedDate]].orderedCities.filter(city => {
				return city && city.city && city.city.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
			});


			this.setState({ matchedCityList, searchKey: e.target.value });
		} else {
			this.setState({ matchedCityList: null, searchKey: '' });
		}

	};

	scrollToCity = city => {
		// console.log('scrollToCity');

		if (this.state.windowWidth && this.state.windowWidth > 720 && this.state.historyCases?.[this.state.orderedDateList?.[this.state.selectedDate]]?.orderedCities) {
			// console.log('city', city);
			this.state.cityRefs?.[city]?.current?.scrollIntoView({
				block: 'start',
			});
		}

	};

	renderLeftPanel = () => {

		if (this.state.windowWidth && this.state.windowWidth > 720 && this.state.historyCases?.[this.state.orderedDateList?.[this.state.selectedDate]]?.orderedCities) {
			return (
				<LeftPanel
					cityListProps={{
						cityList: this.state.searchKey ? this.state.matchedCityList : this.state.historyCases[this.state.orderedDateList[this.state.selectedDate]].orderedCities,
						setMouseHoveredCity: this.setMouseHoveredCity,
						mouseHoveredCity: this.state.mouseHoveredCity,
						cityRefs: this.state.cityRefs,
						searchKey: this.state.searchKey,
						scrollToCity: this.scrollToCity
					}}

					leftPanelFixdDiv={{
						onSearch: this.onSearch,
						searchKey: this.state.searchKey,
						playing: this.state.playing
					}}

					renderCityList={this.state.polygons}

				/>
			);
		}

	};


	render() {

		return (
			<div
				style={{ height: '100%', width: '100%' }}
				id={'main'}
			>
				{this.renderLeftPanel()}


				{this.renderGmap()}

			</div>
		);
	}

}




