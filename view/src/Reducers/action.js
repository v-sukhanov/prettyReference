import { CREATE_CARD, CREATE_TOPIC, DELETE_TOPIC, SET_ACTUAL_SUB_TOPIC, DELETE_CARD, CREATE_SUB_TOPIC } from './types'






export function action_createTopic(topicTitle) {
	return {
		type: CREATE_TOPIC,
		data: { topicTitle }
	}
}

export function action_deleteTopic(topicId) {
	return {
		type: DELETE_TOPIC,
		data: { topicId }
	}
}

export function action_createSubTopic(subTopicTitle, topicId) {

	return {
		type: CREATE_SUB_TOPIC,
		data: { subTopicTitle, topicId }
	}
}

export function action_setActualSubTopic(topicId, subTopicId) {
	return {
		type: SET_ACTUAL_SUB_TOPIC,
		data: { topicId, subTopicId }
	}
}

export function action_createCard(url) {
	return async dispatch => {
		const responce = await fetch('http://localhost:3333', {method: 'POST', body: url, headers: {'content-type': 'text/plain'}})
		const referenceData = await responce.json()
		
		dispatch({ type:  CREATE_CARD, data: {...referenceData} })
	}
}

export function action_deleteCard(cardId) {
	return {
		type: DELETE_CARD,
		data: {cardId}
	}
}