import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchBar';
import VideoList from './components/videoList';
import VideoDetail from './components/videoDetail';

const API_KEY = 'AIzaSyDkU6nKpKIafjZcGmS-jOO3VgO41Xgbv6w';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null,
		};
		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term }, (videos) => {
			this.setState({
				videos,
				selectedVideo: videos[0],
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term); }, 500);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
					videos={this.state.videos}
				/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
