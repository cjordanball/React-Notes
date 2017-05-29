import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import requireAuth from './components/HOCs/require_auth';
import App from './components/app';
import Resources from './components/resources';
import Home from './components/home';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<Route path="/" component={ App } />
				<Switch>
					<Route path="/resources" component={requireAuth(Resources)} />
					<Route path="/home" component={ Home } />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>
	,document.querySelector('.container')
);
