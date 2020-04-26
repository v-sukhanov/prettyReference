import { CREATE_CARD, CREATE_TOPIC, DELETE_TOPIC, SET_ACTUAL_TOPIC } from './types'



export function action_createCard(url) {
	return async dispatch => {
		const responce = await fetch('http://localhost:3333', {method: 'POST', body: url, headers: {'content-type': 'text/plain'}})
		const referenceData = await responce.json()

		dispatch({ type:  CREATE_CARD, data: {...referenceData} })
	}
}


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

export function action_setActualTopic(topicId) {
	return {
		type: SET_ACTUAL_TOPIC,
		data: { topicId }
	}
}