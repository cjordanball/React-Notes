import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import comps from './components';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/posts/new" component={comps.NewPost} />
					<Route path="/posts/:id" component={comps.ShowPost} />
					<Route path="/" component={comps.PostsIndex} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>
	, document.querySelector('.container'));
