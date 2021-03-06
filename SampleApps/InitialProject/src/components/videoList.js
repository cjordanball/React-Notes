import React from 'react';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
	const videos = props.videos;
	const videoItems = videos.map((video) => {
		return (
			<VideoListItem
				onVideoSelect={props.onVideoSelect}
				video={video} key={video.etag}
			/>
		);
	});

	return (
		<ul className="col-md-4 list-group">
			{videoItems}
		</ul>
	);
};

export default VideoList;
