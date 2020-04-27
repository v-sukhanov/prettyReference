import React, { useState } from 'react'

import SubTopicList from './SubTopicList/SubTopicList'
import SubTopicCreator from './SubTopicCreator.js/SubTopicCreator'

const Topic = ({ topic, actualSubTopic, createSubTopic, setActualSubTopic }) => {

	const [stateTopic, setStateTopic] = useState(false) // false - topic close, true - topic open

	const clickTopicHandler = (e) => {
		setStateTopic(!stateTopic)
	}

	return (
		<div
			style={{position: 'relative', marginTop: '5px', userSelect: 'none'}}
			data-id={topic.id}
		>
			<li
				className="list-group-item pt-1 pb-2"
				style={{background: 'none', border: 'none', color: '#949494', cursor: 'pointer'}}
				onClick={clickTopicHandler}
			>
				<span>
					{ topic.title }
				</span>
			</li>

			<i
				className="material-icons"
				style={{position: 'absolute', right: '10px', top: '6px', fontSize: '18px', color: '#949494', cursor: 'pointer'}}
				onClick={clickTopicHandler}
			>
				{stateTopic ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
			</i>

			<div  style={{display: stateTopic ? 'block' : 'none'}}>
				<SubTopicCreator createSubTopic={createSubTopic} topicId={topic.id}/>
				<SubTopicList topicId={topic.id} subTopic={topic.subTopics} actualSubTopic={actualSubTopic} setActualSubTopic={setActualSubTopic} />
			</div>

		</div>
	)
}

export default Topic