import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

import './App.css';

import ReferenceInput from './Components/ReferenceInput/ReferenceInput'
import TopicCreator from './Components/TopicCreator/TopicCreator'
import TopicList from './Components/TopicList/TopicList';
import Cards from './Components/Cards/Cards';
import Notice from './Components/Notice/Notice';

import { action_createTopic, action_deleteTopic, action_createCard, action_setActualTopic } from './Reducers/action'


function App({ topics, actualTopic, actualCards, createTopic, deleteTopic, createCard, setActualTopic }) {

	console.log(actualCards)

	return (
		<div className="fuild-containe ml-5 mr-5 mt-5">
			<Notice/>
			<div className="row">
				<div className="col-3 list-group mt-3">
					<TopicCreator createTopic={createTopic}/>
					<TopicList topics={topics} actualTopic={actualTopic} deleteTopic={deleteTopic} setActualTopic={setActualTopic}/>
					
				</div>
				
				<div className="col mt-3 " >
					<Cards cards={actualCards}/>
				</div>
			</div>
			<ReferenceInput className={'list-group-item'} createCard={createCard}/>
		</div>
	);
}







const mapStateToProps = (state) => {
	return {
		topics: state.topics,
		actualTopic: state.actualTopic,
		actualCards: state.topics.length ?  state.topics.find(topic => topic.id === state.actualTopic).cards : null
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createTopic: (topicTitle) => dispatch(action_createTopic(topicTitle)),
		deleteTopic: (topicId) => dispatch(action_deleteTopic(topicId)),
		createCard: (url) => dispatch(action_createCard(url)),
		setActualTopic: (topicId) => dispatch(action_setActualTopic(topicId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
