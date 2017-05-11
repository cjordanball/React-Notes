import React, { Component } from 'react';

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
		this.setState({ comment: '' });
	}

	render() {
		return (
			<form className="comment-box" onSubmit={event => this.submitText(event)}>
				<textarea
					value={this.state.comment}
					onChange={event => this.handleChange(event)}
				/>
				<button>Submit Comments</button>
			</form>
		);
	}
}

export default CommentBox;
