import React from 'react';
import { Link } from 'react-router-dom';

const PostList = (props) => {
	const postKeys = Object.keys(props.posts);
	const listOfPosts = postKeys.map(num => (
		<li className="list-group-item" key={num}>
			<Link to={`/posts/${num}`}>
				{props.posts[num].title}
			</Link>
		</li>
	));

	return (
		<div>
			<h3>Posts</h3>
			<ul className="list-group">
				{listOfPosts}
			</ul>
		</div>
	);
};


export default PostList;
