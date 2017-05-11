import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveComment } from '../actions';

class CommentBox extends Component {
	constructor(props) {
		super(props);

		this.state = { comment: '' };
	}

	handleChange(event) {
		this.setState({ comment: event.target.value });
	}

	submitText(event) {
		event.preventDefault();
		this.props.saveComment(this.state.comment);
		this.setState({ comment: '' });
	}

	render() {
		return (
			<form className="comment-box" onSubmit={event => this.submitText(event)}>
				<h4>Add a Comment</h4>
				<textarea
					value={this.state.comment}
					onChange={event => this.handleChange(event)}
				/>
				<div>
					<button>Submit Comments</button>
				</div>
			</form>
		);
	}
}

export default connect(null, { saveComment })(CommentBox);
