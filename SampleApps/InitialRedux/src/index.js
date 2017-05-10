import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/app';

const makeStore = applyMiddleware()(createStore);

ReactDOM.render(
	<Provider store={makeStore(reducers)}>
		<App />
	</Provider>, document.getElementById('root'),
);
