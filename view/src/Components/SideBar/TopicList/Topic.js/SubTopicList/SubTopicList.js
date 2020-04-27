import React from 'react'
import SubTopic from './SubTopic.js/SubTopic'



const SubTopicList = ({ topicId, subTopic, actualSubTopic, setActualSubTopic }) => {
	return (
		<div className="mb-2 mt-2">
			{ subTopic && subTopic.map(subTopic => <SubTopic topicId={topicId} subTopic={subTopic} actualSubTopic={actualSubTopic} setActualSubTopic={setActualSubTopic} key={subTopic.id}/>) }
		</div>
	)
}

export default SubTopicList