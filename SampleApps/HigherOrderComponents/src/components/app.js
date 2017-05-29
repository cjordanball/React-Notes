import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './home';
import Resources from './resources';
import Header from './header';

class App extends Component {
	componentWillMount() {
		this.props.history.push('/home');
	}
	render() {
		return (
			<div>
			<Header {...this.props} auth={this.props.authorized}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authorized: state.authenticated
	}
}

export default connect(mapStateToProps)(App);
