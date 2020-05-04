import React, { PureComponent } from 'react';
import { GOOGLE_API_KEY } from '../Constant';
import { getHeatMapColor } from '../functions/functions';
import { cityBoundaries } from '../geoData';
import virusIconUrl from '../../assets/images/virus.png';

const gmapStyle = [
	{
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#f5f5f5"
			}
		]
	},
	{
		"elementType": "labels.icon",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#616161"
			}
		]
	},
	{
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": "#f5f5f5"
			}
		]
	},
	{
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#ffffff"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#eeeeee"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#757575"
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#e5e5e5"
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9e9e9e"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#ffffff"
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#757575"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#dadada"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#616161"
			}
		]
	},
	{
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9e9e9e"
			}
		]
	},
	{
		"featureType": "transit.line",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#e5e5e5"
			}
		]
	},
	{
		"featureType": "transit.station",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#eeeeee"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#c9c9c9"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9e9e9e"
			}
		]
	}
];

const getVirusIconSize = cases => {

	const size = cases * 0.01 + 20;
	// console.log('size>>>>>>>>>>>>>>>>>>>>>>.', size);
	return size;
};

export default class Gmap extends PureComponent {


	constructor(props) {
		super(props);
	}

	async componentDidMount() {

		try {
			// console.log('Gmap componentDidMount');
			const googleMapScript = document.createElement('script');
			googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=visualization`;
			googleMapScript.async = true;
			googleMapScript.defer = true;
			window.document.body.appendChild(googleMapScript);
			googleMapScript.addEventListener('load', this.createGmap);


		} catch (e) {
			// console.log('gmap componentDidMount',e);
			// console.log('gmap componentDidMount',e.response)

		}

	}

	componentDidUpdate(prevProps) {

		if (prevProps.selectedDate && (prevProps.selectedDate !== this.props.selectedDate)) {
			this.setPolygonsAndMarkers();
		}
	}

	createGmap = () => {

		const styledMapType = new google.maps.StyledMapType(gmapStyle, { name: 'Grey' });

		const gmap = new google.maps.Map(document.getElementById("map"),
			{
				center: { lat: 43.903569, lng: -79.303954 },
				zoom: window?.innerWidth < 400 ? 8 : 9.2,
				mapTypeControlOptions: {
					mapTypeIds: ['roadmap', 'satellite', 'Grey']
				}

			});

		gmap.mapTypes.set('Grey', styledMapType);
		gmap.setMapTypeId('Grey');

		this.createPolygonesAndMarkers(gmap);

	};

	createPolygonesAndMarkers = gmap => {

		const polygons = {};
		const markers = {};
		const infowindows = {};

		for (const city in cityBoundaries) {
			if (cityBoundaries.hasOwnProperty(city)) {

				infowindows[city] = new google.maps.InfoWindow({
					content: `${city} | ${this.props.cases[city]} cases`
				});


				if (cityBoundaries[city].latlng) {

					const iconSize = getVirusIconSize(this.props.cases[city]);

					const icon = {
						url: virusIconUrl, // url
						scaledSize: new google.maps.Size(iconSize, iconSize), // scaled size
						origin: new google.maps.Point(0, 0), // origin
						anchor: new google.maps.Point(iconSize/2, iconSize/2) // anchor
					};

					const label = {
						color: 'white', // <= HERE
						fontSize: '9px',
						fontWeight: '900',
						text: `${this.props.cases[city]}`
					};

					markers[city] = new google.maps.Marker({
						position: cityBoundaries[city].latlng,
						map: gmap,
						// title: `${city} | ${this.props.cases[city]} cases`,
						label,
						icon
					});

					//for mobile
					markers[city].addListener('click', () => {
						infowindows?.[this.props.mouseHoveredCity]?.close();
						infowindows[city].open(gmap, markers[city]);
						this.props.setMouseHoveredCity(city, true);

					});
				}

				const PolygonOpt = {
					paths: cityBoundaries[city].boundary,
					strokeColor: '#FF0000',
					strokeOpacity: 0.6,
					strokeWeight: 1,
					fillColor: getHeatMapColor(this.props.maxCases, this.props.cases[city]),
					fillOpacity: 0.7
				};

				polygons[city] = new google.maps.Polygon(PolygonOpt);

				polygons[city].setMap(gmap);

				google.maps.event.addListener( polygons[city], "mouseover" ,() => {
					this.props.setMouseHoveredCity(city, true);
					infowindows[city].open(gmap, markers[city]);
					polygons[city].setOptions({fillOpacity: 0.5});
				});


				//for mobile
				google.maps.event.addListener( polygons[city], "click" ,() => {
					this.props.setMouseHoveredCity(city, true);
					infowindows[city].open(gmap, markers[city]);
					polygons[city].setOptions({fillOpacity: 0.5});
				});

				google.maps.event.addListener(polygons[city], "mouseout", () => {
					infowindows[city].close();
					polygons[city].setOptions({fillOpacity: 0.7});
				});
			}
		}

		this.props.setMapRefs({ polygons, markers, gmap, infowindows });
	};


	setPolygonsAndMarkers = () => {

		// console.log('setPolygonsAndMarkers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

		const { polygons, markers, infowindows } = this.props.getPolygonsAndMarkers;
		// console.log('this.props.getPolygonsAndMarkers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.props.getPolygonsAndMarkers);

		for (const city in cityBoundaries) {
			if (cityBoundaries.hasOwnProperty(city)) {
				// console.log('infowindows>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', infowindows);
				const cases = `${this.props.cases[city] || this.props.cases[city] === 0 ? this.props.cases[city] : 'NA'}`;

				infowindows?.[city]?.setContent(`${city} | ${cases}`);

				const polygonOpt = {
					fillColor: getHeatMapColor(this.props.maxCases, cases),
					fillOpacity: 0.7
				};


				polygons?.[city]?.setOptions(polygonOpt);


				if (cityBoundaries?.[city].latlng) {

					const iconSize = getVirusIconSize(cases);

					const icon = {
						url: virusIconUrl, // url
						scaledSize: new google.maps.Size(iconSize, iconSize), // scaled size
						origin: new google.maps.Point(0, 0), // origin
						anchor: new google.maps.Point(iconSize/2, iconSize/2) // anchor
					};

					const label = {
						color: 'white', // <= HERE
						fontSize: '9px',
						fontWeight: '900',
						text: `${cases}`
					};

					markers[city].setOptions({
						// position: cityBoundaries[city].latlng,
						// map: gmap,
						title: `${city} | ${cases}`,
						label,
						icon
					});
				}
			}
		}
	};


	render() {
		return (
			<div
				id={"map"}

			/>

		)
	}
}

