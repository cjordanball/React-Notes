import axios from 'axios';
import ActionTypes from './types';

const API_KEY = '88eb2a1acefe1cd19130e08ce26c1a48';
const BASE_URL = `http://api.openweathermap.org/data/2.5/forecast/?APPID=${API_KEY}`;

export function fetchWeather(city) {
	const url = `${BASE_URL}&q=${city},us`;
	const resPromise = axios.get(url);
	return {
		type: ActionTypes.FETCH_WEATHER,
		payload: resPromise,
	};
}
