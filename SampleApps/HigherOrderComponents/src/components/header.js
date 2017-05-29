import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Authenticate }from '../actions';


class Header extends Component {
	authButton() {
		return <button onClick={() => this.props.Authenticate(!this.props.auth)}>{this.props.auth ? 'Sign out' : 'Sign In'}</button>;
	}
	
	render() {
		return (
			<nav className="navbar navbar-light">
				<ul className="nav navbar-nav">
					<li className="nav-item">
						<Link to="/home">Home</Link>
					</li>
					<li className="nav-item">
						<Link to="/resources">Resources</Link>
					</li>
					<li className="nav-item">
						{this.authButton()}
					</li>
				</ul>
			</nav>
		)
	}
}

export default connect(null, { Authenticate })(Header);
