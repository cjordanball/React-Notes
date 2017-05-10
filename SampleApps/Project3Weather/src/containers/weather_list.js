import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
	static renderWeather(cityData) {
		const name = cityData.city.name;
		const temps = cityData.list.map(val => Math.round((val.main.temp * (9 / 5)) - 459.67));
		const pressures = cityData.list.map(val => val.main.pressure);
		const humids = cityData.list.map(val => val.main.humidity);
		const { lon, lat } = cityData.city.coord;

		return (
			<tr key={name}>
				<td><GoogleMap lat={lat} lon={lon} /></td>
				<Chart color="red" data={temps} units="F" />
				<Chart color="green" data={pressures} units="hPa" />
				<Chart color="blue" data={humids} units="%" />
			</tr>
		);
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (F)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{ this.props.weather.map(WeatherList.renderWeather) }
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = ({ weather }) => (
	{
		weather,
	}
);

export default connect(mapStateToProps)(WeatherList);
