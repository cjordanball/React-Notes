import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveComment } from '../actions';

class CommentBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
		};
	}

	handleChange(e) {
		this.setState({ comment: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.saveComment(this.state.comment);
		this.setState({ comment: '' });
	}

	render() {
		return (
			<form onSubmit={e => this.handleSubmit(e)} className="comment-box">
				<h4>Add a Comment</h4>
				<div className="comment-box">
					<textarea value={this.state.comment} onChange={e => this.handleChange(e)} />
					<div>
						<button action="submit">Submit Comment</button>
					</div>
				</div>
			</form>
		);
	}

}

// export default CommentBox;
export default connect(null, { saveComment })(CommentBox);
