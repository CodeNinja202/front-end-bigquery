import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class PieChart extends Component {
	state = {
		dataPoints: []
	};

	componentDidMount() {
		// Fetch the data from the server
		axios.get('http://localhost:5050/bigqueryData')
			.then((response) => {
				// Process the response data to create dataPoints for the chart
				const dataPoints = response.data.map((item) => ({
					label: item.state,
					y: item.courseCount
				}));

				// Update the state with the dataPoints
				this.setState({ dataPoints });
                
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	render() {
		const options = {
			animationEnabled: true,
			theme: "dark2",
			title: {
				text: "Golf Courses by State"
			},
			axisY: {
				title: "Number of Courses"
			},
			data: [{
				type: "column",
				indexLabel: "{y}",		
				indexLabelFontColor: "white",
				dataPoints: this.state.dataPoints
			}]
		};
		
		return (
			<div>
				<CanvasJSChart options={options} />
			</div>
		);
	}
}
 
export default PieChart;
