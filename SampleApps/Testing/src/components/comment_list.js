import React from 'react';
import { connect } from 'react-redux';

const CommentList = (props) => {
// const CommentList = () => {
	const list = props.comments.map(comment => (
		<li key={comment}>{comment}</li>
	));
	return (
		<ul className="comment-list">{list}</ul>
		// <ul className="comment-list"><li>rhinos</li></ul>
	);
};

const mapStateToProps = state => (
	{ comments: state.comments }
);

// export default CommentList;
export default connect(mapStateToProps)(CommentList);
