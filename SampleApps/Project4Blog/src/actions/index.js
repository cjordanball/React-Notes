import axios from 'axios';
import ActionTypes from './types';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=cjordanball';

export function fetchPosts() {
	const resPromise = axios.get(`${ROOT_URL}/posts${API_KEY}`);
	return {
		type: ActionTypes.FETCH_POSTS,
		payload: resPromise,
	};
}

export const createPost = (values, callback) => {
	const resPromise = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
		.then(() => callback());
	return {
		type: ActionTypes.CREATE_POST,
		payload: resPromise,
	};
};

export const fetchPost = (id) => {
	const resPromise = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
	return {
		type: ActionTypes.FETCH_POST,
		payload: resPromise,
	};
};

export const deletePost = (id, callback) => {
	axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
		.then(() => callback());
	return {
		type: ActionTypes.DELETE_POST,
		payload: id,
	};
};
