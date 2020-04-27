import React from 'react'
import { connect } from 'react-redux'

import Cards from './Cards/Cards'
import ReferenceInput from './ReferenceInput/ReferenceInput'
import { action_createCard } from '../../Reducers/action'

const MainPage = ({ subTopic, createCard }) => {
	return (
		<div className="col" style={{position: 'relative'}} >
			{ subTopic && <Cards cards={subTopic.cards}/>}
			<ReferenceInput className={'list-group-item'} createCard={createCard}/> 
		</div>
	)
}

const mapStateToProps = (state) => {
	if (!state.actualSubTopic.subTopicId) {
		return {
			subTopic: null
		}
	} else {
		
		return {
			subTopic: state.actualSubTopic.subTopic
		}
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		createCard: (url) => dispatch(action_createCard(url))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
