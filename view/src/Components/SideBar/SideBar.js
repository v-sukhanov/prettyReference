import React from 'react'
import { connect } from 'react-redux'

import TopicCreator from './TopicCreator/TopicCreator'
import TopicList from './TopicList/TopicList'
import WindowSettings from './WindowSettings/WindowSettings'

import { 
			action_createTopic,
			action_setActualSubTopic,
			action_createSubTopic,
			action_setWindowSettings,
			action_setCandidateForDeletion,
			action_unsetCandidateForDeletion,
			action_deleteCandidateForDeletion
} from '../../Reducers/action'


const SideBar = ({ topics, actualSubTopic, modeSettings, createTopic, createSubTopic, setActualSubTopic, setWindowSettingsState, setCandidateForDeletion, unsetCandidateForDeletion, deleteCandidateForDeletion }) => {

	return (
		<div className="col-2 list-group p-0" style={{background: '#2c2c2c', borderRight: '1px solid rgba(255, 255, 255, .2)'}}>
			<TopicCreator createTopic={createTopic}/>
			<TopicList
				topics={topics}
				actualSubTopic={actualSubTopic}
				modeSettings={modeSettings}
				createSubTopic={createSubTopic}
				setActualSubTopic={setActualSubTopic}
				setCandidateForDeletion={setCandidateForDeletion}
				unsetCandidateForDeletion={unsetCandidateForDeletion}
			/>
			<WindowSettings modeSettings={modeSettings} setWindowSettingsState={setWindowSettingsState} deleteCandidateForDeletion={deleteCandidateForDeletion}/>
		</div>
	)
}


const mapStateToProps = (state) => {
	return {
		topics: state.topics,
		actualSubTopic: state.actualSubTopic,
		modeSettings: state.stateWindowSettings.mode
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createTopic: (topicTitle) => dispatch(action_createTopic(topicTitle)),
		createSubTopic: (subTopicTitle, topicId) => dispatch(action_createSubTopic(subTopicTitle, topicId)),
		setActualSubTopic: (topicId, subTopicId) => dispatch(action_setActualSubTopic(topicId, subTopicId)),
		setWindowSettingsState: (state) => dispatch(action_setWindowSettings(state)),
		setCandidateForDeletion: (mode, payload) => dispatch(action_setCandidateForDeletion(mode, payload)),
		unsetCandidateForDeletion: (mode, payload) => dispatch(action_unsetCandidateForDeletion(mode, payload)),
		deleteCandidateForDeletion: () => dispatch(action_deleteCandidateForDeletion())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)