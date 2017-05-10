import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {
	render() {
		console.log('book', this.props.book);
		if (!this.props.book.title) {
			return <h3>Select a book.</h3>;
		}
		return (
			<div>
				<h3>Details for:</h3>
				<div>Title: {this.props.book.title}</div>
				<div>Pages: {this.props.book.pages}</div>
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		book: state.activeBook,
	}
);

export default connect(mapStateToProps)(BookDetail);
