import React, { useState } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import SubTopicCreator from './SubTopicCreator.js/SubTopicCreator'
import SubTopicList from './SubTopicList/SubTopicList'

const DeleteIcon = ({ modeSettings, deleteTopic, clickDeleteIcon }) => {


	if (modeSettings === 2) {
		return (
			<div style={{position: 'absolute', left: '3px', top: '3px', borderRadius: '5px', border: '1px solid grey', width: '20px', height: '20px', cursor: 'pointer' }} onClick={clickDeleteIcon}>
				{
					deleteTopic
					&&
					<i className="delete_icon material-icons text-info" style={{ fontSize: '20px'}}>
						done
					</i>
				}
				
			</div>
		)
	} else {
		return false
	}
}

const TopicTitle = ({ topic, stateTopic, modeSettings, clickTopicHandler }) => {


	return (
		<div>
			<li
				className="list-group-item pt-1 pb-2 pl-0"
				style={{background: 'none', border: 'none', color: '#949494', paddingRight: '25px', cursor: 'pointer', marginLeft: modeSettings === 2 ? '30px': '15px', overflow: 'hidden'}}
				onClick={clickTopicHandler}
			>
				<span>
					{ topic.title }
				</span>
			</li>
			<i
				className="material-icons"
				style={{position: 'absolute', right: modeSettings === 2 ? '0px' : '10px', top: '6px', fontSize: '18px', color: '#949494', cursor: 'pointer'}}
				onClick={clickTopicHandler}
			>
				{stateTopic ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
			</i>
		</div>
	)
}


const Topic = ({ topic, actualSubTopic, modeSettings, createSubTopic, setActualSubTopic, unsetCandidateForDeletion, setCandidateForDeletion }) => {

	const [stateTopic, setStateTopic] = useState(false) // false - topic close, true - topic open
	const [deleteTopic, setDeleteTopic] = useState(false)

	const clickTopicHandler = (e) => {
		setStateTopic(!stateTopic)
	}

	const clickDeleteIcon = () => {
		setDeleteTopic(!deleteTopic)
		if (!deleteTopic) {
			setCandidateForDeletion(1, { topicId: topic.id }) // 1 - topic
		} else {
			unsetCandidateForDeletion(1, { topicId: topic.id })
		}
	}


	return (
		<div className="topic" style={{position: 'relative', marginTop: '5px', userSelect: 'none'}} data-id={topic.id}>
			
			<DeleteIcon modeSettings={modeSettings} deleteTopic={deleteTopic} clickDeleteIcon={clickDeleteIcon}/>
			<TopicTitle topic={topic} stateTopic={stateTopic} modeSettings={modeSettings} clickTopicHandler={clickTopicHandler}/>

			{
				stateTopic
				&&
				<div>
					<SubTopicCreator createSubTopic={createSubTopic} topicId={topic.id}/>
					<SubTopicList
						topicId={topic.id}
						subTopic={topic.subTopics}
						actualSubTopic={actualSubTopic}
						modeSettings={modeSettings}
						deleteTopic={deleteTopic} 
						setActualSubTopic={setActualSubTopic}
						setDeleteTopic={setDeleteTopic}
						setCandidateForDeletion={setCandidateForDeletion}
						unsetCandidateForDeletion={unsetCandidateForDeletion}
					/>
				</div>
			}
			

		</div>
	)
}

const TopicList = ({ topics, actualSubTopic, modeSettings, createSubTopic, setActualSubTopic, unsetCandidateForDeletion, setCandidateForDeletion }) => {

	return (
		<SimpleBar className="pl-1 pt-3 pr-3" style={{ height: '82vh'}} autoHide={false}>
			{ topics && topics.map(((topic, key) => <Topic
														topic={topic} 
														actualSubTopic={actualSubTopic} 
														modeSettings={modeSettings} 
														createSubTopic={createSubTopic} 
														setActualSubTopic={setActualSubTopic}
														unsetCandidateForDeletion={unsetCandidateForDeletion}
														setCandidateForDeletion={setCandidateForDeletion}
														key={topic.id} 
													/> )) }
		</SimpleBar>

	)
}

export default TopicList
