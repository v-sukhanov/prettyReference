import React from 'react'
import { connect } from 'react-redux'

import TopicCreator from './TopicCreator/TopicCreator'
import TopicList from './TopicList/TopicList'
import { action_createTopic, action_setActualSubTopic, action_createSubTopic } from '../../Reducers/action'

const SideBar = ({ topics, actualSubTopic, createTopic, createSubTopic, setActualSubTopic }) => {
	return (
		<div className="col-2 list-group p-0" style={{background: '#2c2c2c', borderRight: '1px solid rgba(255, 255, 255, .2)'}}>
			<TopicCreator createTopic={createTopic}/>
			<TopicList topics={topics} actualSubTopic={actualSubTopic} createSubTopic={createSubTopic} setActualSubTopic={setActualSubTopic}/>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		topics: state.topics,
		actualSubTopic: state.actualSubTopic
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createTopic: (topicTitle) => dispatch(action_createTopic(topicTitle)),
		createSubTopic: (subTopicTitle, topicId) => dispatch(action_createSubTopic(subTopicTitle, topicId)),
		setActualSubTopic: (topicId, subTopicId) => dispatch(action_setActualSubTopic(topicId, subTopicId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)