import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authentication extends Component {
		componentWillMount() {
			if (!this.props.authenticated) {
				this.props.history.push('/home');
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				this.props.history.push('/home');
			}
		}

		render() {
			console.log('context', this.context);
			return <ComposedComponent {...this.props} />
		}
	}

	const mapStateToProps = state => (
		{
			authenticated: state.authenticated
		}
	);

	return connect(mapStateToProps)(Authentication);
}
