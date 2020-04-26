import randToken from 'rand-token'

import { CREATE_CARD, CREATE_TOPIC, DELETE_TOPIC, SET_ACTUAL_TOPIC } from './types'

export default (state = { topics: [], actualTopic: null, notice: { code: 0 }}, action) => {
	let newState = { ...state, notice: { code: 0 } }
	switch (action.type) {
		case CREATE_CARD:
			if (!state.actualTopic) {
				newState = {... newState, notice: {code: 2}}
			} else if (action.data.error) {
				newState = { ...newState, notice: {code: 3} }
			} else if (!Object.keys(action.data).length) {
				newState = {... newState, notice: {code: 1}}
			} else {
				const newTopics = state.topics.map((topic) => {
					if (topic.id === state.actualTopic) {
						return { ...topic, cards: [...topic.cards, action.data] }
					} else {
						return topic
					}
				})
				newState = { ...newState, topics: newTopics, notice: {code: 4} }
			}
			break
		case CREATE_TOPIC:
			const newId = randToken.uid(16)
			const topics = [...newState.topics]
			topics.unshift({id: newId, title: action.data.topicTitle, cards: []})
			newState = { ...newState, topics, actualTopic: newId}
			break
		case DELETE_TOPIC:
			const newTopics = newState.topics.filter(topic => topic.id !== action.data.topicId)
			let newActualTopic = null
			if (newTopics.length) {
				newActualTopic = newTopics[0].id
			}
			newState = { ...newState, topics: newTopics, actualTopic: newActualTopic }
			break
		case SET_ACTUAL_TOPIC: 
			newState = { ...newState, actualTopic: action.data.topicId }
			break
		default:
			break
	}

	return newState
}