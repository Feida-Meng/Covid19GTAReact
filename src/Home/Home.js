import React, { Component } from 'react';
import Gmap from './Gmap';
import axios from "axios";
import { getDateString } from "../functions/functions";
import {baseUrl, cityColorCode} from '../Constant';
import { LeftPanel } from './leftPanel';
import { TopPanel } from "./TopPanel";

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
			searchKey: '',
			matchedCityList: null,
			selectedDate:'',
			playStatus: 'play',
			windowSize: null,
			playing: 0, // 0.not started 1.playing 2.pause
			currentIndex: 0
		}

	}

	async componentDidMount() {
		console.log('componentDidMount');

		try {

			this.onResize();
			window.addEventListener("resize", this.onResize);
			await this.getTheLatestCases();

			this.getAllCasesInHistory();


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


	getAllCasesInHistory = async () => {

		const allCasesInHistory = await axios({ method: 'get', url: `${baseUrl}/covid19/history` });

		// console.log('allCasesInHistory', allCasesInHistory);

		const historyCases = [];
		const orderedDateList = {};

		allCasesInHistory?.data?.data?.data?.forEach( (date,index) => {

			const orderedCities = [];
			const cases = { };

			date?.data?.forEach( city => {
				cases[city.cityAndRegion] = city.cases;
				orderedCities.push({ city: city.cityAndRegion, cases: city.cases });
			});


			const selectedDate = getDateString(date._id);

			historyCases[index] = {};
			orderedDateList[selectedDate] = index;
			historyCases[index].cases = cases;
			historyCases[index].orderedCities = orderedCities;
			historyCases[index].date = selectedDate;

		});


		this.setState({ historyCases, orderedDateList }, this.formatDataForChart);

	};

	formatDataForChart = async () => {

		const chartDatasets = [];

		const results = await axios({ method: 'get', url: `${baseUrl}/covid19/chartdata` });
		// console.log('results',results);

		const chartLabels = [];

		this.state.historyCases?.forEach( item => {
			if (item.date && item.date !== '2020 Apr,21') {
				chartLabels.push(item.date);
			}
		});
		// console.log('chartLabels', chartLabels);

		results?.data?.data?.data?.forEach( (city, index) => {
			chartDatasets[index] = {
				label: city._id,
				fill: false,
				lineTension: 0.5,
				backgroundColor: cityColorCode[index],
				borderColor: cityColorCode[index],
				data: city?.data
			}
		});


		// console.log('chartDatasets', chartDatasets);


		this.setState({ chartLabels, chartDatasets });
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


	onDateSelected = (selectedDate, callback) => {
		// console.log('selectedDate', selectedDate );

		this.setState({ selectedDate, changingDate: true }, () => {

			callback?.();

			if (this.state.mouseHoveredCity && !this.state.searchKey) {
				this.scrollToCity(this.state.mouseHoveredCity);
				this.state.infowindows?.[this.state.mouseHoveredCity]?.open(this.state.gmap, this.state.markers[this.state.mouseHoveredCity]);
			}

			setTimeout(() => this.setState({ changingDate: false }), 100);

		});
	};

	onPlayBtn = () => {

		if (!this.state.playing || this.state.playing === 2 ) {

			this.setState({ playing: 1, searchKey: '' }, this.onPlay);

		}  else if (this.state.playing === 1) {
			this.setState({ playing: 2 });
		}
	};

	onPlay = () => {

		// console.log('onPlay startIndex', this.state.currentIndex);

		// console.log('this.state.historyCases.length', this.state.historyCases.length);

		if (this.state.currentIndex >= this.state.historyCases.length) {
			this.setState({ playing: 0, currentIndex: 0 });

		} else if (this.state.playing === 1) {
			// console.log('onPlay startIndex', this.state.historyCases[this.state.currentIndex].date);

			this.onDateSelected(this.state.historyCases[this.state.currentIndex].date, () => {
				this.setState({ currentIndex: this.state.currentIndex + 1 }, () => setTimeout(() => this.onPlay(), 1000));

			});

		}

	};



	render() {

		return (
			<div
				style={{ height: '100%', width: '100%' }}
				id={'main'}
			>
				{this.renderLeftPanel()}

				<div id={'right-column'}>

					<TopPanel
						currentDate={this.state.selectedDate}
						onPlayBtn={this.onPlayBtn}
						changingDate={this.state.changingDate}
						playing={this.state.playing}
					/>

					{this.renderGmap()}


				</div>
			</div>
		);
	}

}




