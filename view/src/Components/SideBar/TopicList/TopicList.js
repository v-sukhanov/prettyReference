import React from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import Topic from './Topic.js/Topic';

const TopicList = ({ topics, actualSubTopic, createSubTopic, setActualSubTopic }) => {



	return (
		<SimpleBar className="pl-1 pt-3 pr-3" style={{ height: '87vh'}} autoHide={false}>
			{ topics && topics.map(((topic, key) => <Topic topic={topic} actualSubTopic={actualSubTopic} createSubTopic={createSubTopic} setActualSubTopic={setActualSubTopic} key={topic.id}/> )) }
		</SimpleBar>

	)
}

export default TopicList
