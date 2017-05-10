import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import PostList from '../components/postList';

class PostsIndex extends Component {
	componentWillMount() {
		this.props.fetchPosts();
	}
	render() {
		return (
			<div>
				<div className="text-xs-right">
					<Link to="/posts/new" className="btn btn-primary">
						Add a Post
					</Link>
				</div>
				<PostList posts={this.props.posts} />
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		posts: state.posts,
	}
);

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
