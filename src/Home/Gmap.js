import React, { PureComponent } from 'react';
import { GOOGLE_API_KEY } from '../Constant';


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


export default class Gmap extends PureComponent {


	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		console.log('gmap componentDidMount');

		try {
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


	};




	render() {
		return (
			<div
				id={"map"}

			/>

		)
	}
}

