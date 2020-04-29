import { CREATE_CARD, CREATE_TOPIC, SET_ACTUAL_SUB_TOPIC, CREATE_SUB_TOPIC, SET_WINDOW_SETTINGS_STATE, SET_CANDIDATE_FOR_DELETION, UNSET_CANDIDATE_FOR_DELETION, DELETE_CANDIDATE_FOR_DELETION } from './types'


export function action_createTopic(topicTitle) {
	return {
		type: CREATE_TOPIC,
		data: { topicTitle }
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

export function action_setWindowSettings(state) {
	return {
		type: SET_WINDOW_SETTINGS_STATE,
		data: { state }
	}
}

export function action_setCandidateForDeletion(modeDeletion, payload) {
	return {
		type: SET_CANDIDATE_FOR_DELETION,
		data: {
			modeDeletion, // 1 - delete topic, 2 - delete subTopic, 3 - delete card
			payload
		}
	}
}

export function action_unsetCandidateForDeletion(modeDeletion, payload) {
	return {
		type: UNSET_CANDIDATE_FOR_DELETION,
		data: {
			modeDeletion, // 1 - delete topic, 2 - delete subTopic, 3 - delete card
			payload
		}
	}
}


export function action_deleteCandidateForDeletion() {
	return {
		type: DELETE_CANDIDATE_FOR_DELETION
	}
}