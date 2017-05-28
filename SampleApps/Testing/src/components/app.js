import React, { Component } from 'react';
import CommentBox from './comment_box';
import CommentList from './comment_list';

class App extends Component {
	render() {
		return (
			<div>
				<CommentBox />
				<CommentList />
			</div>
		);
	}
}

export default App;
