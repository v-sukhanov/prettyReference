import React from 'react'


const SubTopic = ({ topicId, subTopic, actualSubTopic, setActualSubTopic }) => {

	const clickSubTopicHandler = (e) => {
		setActualSubTopic(topicId, subTopic.id)
	}

	return (
		<div className={actualSubTopic.subTopicId === subTopic.id ? 'actualSubTopic mt-2' : 'mt-2'} onClick={clickSubTopicHandler} style={{position: 'relative'}}>
			<li
				className="list-group-item ml-3 pt-0 pb-1"
				style={{background: 'none', border: 'none', color: '#ffffff', fontSize: '13px', color: '#949494', cursor: 'pointer'}}
			>
				<span style={{color: actualSubTopic.subTopicId === subTopic.id ? 'white': ''}}>{subTopic.title}</span>
			</li>
			
		</div>
	)
}


export default SubTopic