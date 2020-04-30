import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


export default class LineChart extends Component {

	constructor(props) {
		super(props);
		this.state={
			showLineChart: false,
		}
	}

	toogleLineChart = () => {
		this.setState({ showLineChart: !this.state.showLineChart });
	};

	renderLineChart = () => {

		// console.log('renderLineChart!!!!!!!!');

		return (
			<div style={{ width: '100%', height: '100%'}}>
				<Line
					data={{ labels: this.props.labels, datasets: this.props.datasets }}
					options={{
						title:{
							display:true,
							text:'Confirmed cases in GTA vs Date',
							fontSize: 20
						},
						legend:{
							display: false,
							position:'right',
							labels: {
								fontSize: 10
							}
						},
						backgroundColor: { fill:'transparent' }
					}}
				/>

				<div
					style={{ position: 'absolute', top: 10, right: 10 }}
					onClick={this.toogleLineChart}
				> Close X </div>
			</div>

		);
	};

	getContainerStyle = () => {

		// console.log('renderLineChart!!!!!!!!');

		if (this.state.showLineChart) {

			const width = this.props.windowWidth > 720 ? (this.props.windowWidth - 310) : (this.props.windowWidth - 40);
			const height =  (width / 1.67) > (this.props.windowHeight - 90) ? (this.props.windowHeight - 90) : (width / 1.67);

			return ({
				...styles.container,
				width,
				height,
				backgroundColor: 'white',
				opacity: 0.8,
				alignSelf: 'center',
				marginLeft: null
			});
		} else {
			return styles.container;
		}
	};

	render() {



		return (
			<div
				className={`chart${this.state.showLineChart ? ' opened-chart' : ''}`}
				style={this.getContainerStyle()}
			>
				{
					this.state.showLineChart ?

						this.renderLineChart() :

						<div
							style={{ backgroundColor: '#c73e3a', color: 'white' }}
							onClick={this.toogleLineChart}
						>
							Open Chart
						</div>
				}

			</div>
		)

	}

};


const styles = {
	container: {
		backgroundColor: '#c73e3a',
		// backgroundColor: '#e98b2a',

		position: 'absolute',
		bottom: 10,
		marginLeft: 10,
		borderRadius: 10
	}
};