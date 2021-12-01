import randToken from 'rand-token'

import { CREATE_CARD, CREATE_TOPIC, SET_ACTUAL_SUB_TOPIC, CREATE_SUB_TOPIC, SET_WINDOW_SETTINGS_STATE, SET_CANDIDATE_FOR_DELETION, UNSET_CANDIDATE_FOR_DELETION, DELETE_CANDIDATE_FOR_DELETION } from './types'


const initialState = () => {
	const topics = JSON.parse(localStorage.getItem('topics'))

	return {
		topics: topics ? topics : [],
		actualSubTopic: { topicId: null, subTopicId: null, subTopic: null },
		notice: { code: 0 },
		stateWindowSettings: {
			mode: 0
		},
		candidateForDeletion: {
			topics: [],
			subTopics: [],
			cards: []
		}
	}
}

const createTopic = (newState, { topicTitle }) => {
	const newId = randToken.uid(16)
	const newTopics = [...newState.topics]
	newTopics.unshift({id: newId, title: topicTitle, subTopics: []})
	newState = { ...newState, topics: newTopics}
	localStorage.setItem('topics', JSON.stringify(newTopics))
	return newState
}

const createSubTopic = (newState, { subTopicTitle, topicId }) => {
	console.log(subTopicTitle)
	console.log(topicId)
	const newId = randToken.uid(16)
	const newTopics = newState.topics.map(topic => {
		if (topic.id === topicId) {
			const newSubTopics = [...topic.subTopics]
			newSubTopics.unshift({ id: newId, title: subTopicTitle, cards: [] })
			return { ...topic, subTopics: newSubTopics }
		} else {
			return topic
		}
	})
	localStorage.setItem('topics', JSON.stringify(newTopics))
	return { ...newState, topics: newTopics }
}

const createCard = (newState, data) => {
	if (!newState.actualSubTopic.subTopicId) {
		newState = { ...newState, notice: {code: 2}}
	} else if (data.error) {
		newState = { ...newState, notice: {code: 3} }
	} else if (!Object.keys(data).length) {
		newState = {... newState, notice: {code: 1}}
	} else {
		let actualSubTopic
		const newTopics = newState.topics.map((topic) => {
			if (topic.id === newState.actualSubTopic.topicId) {
				const newSubTopics = topic.subTopics.map(subTopic => {
					if (subTopic.id === newState.actualSubTopic.subTopicId) {
						const newCard = [...subTopic.cards]
						newCard.unshift({ ...data, id: randToken.uid(16)})
						actualSubTopic = { ...newState.actualSubTopic, subTopic: { ...subTopic, cards: newCard } }
						return { ...subTopic, cards: newCard }
					} else {
						return subTopic
					}
					
				})
				return { ...topic, subTopics: newSubTopics }
			} else {
				return topic
			}
		})
		newState = { ...newState, topics: newTopics, notice: {code: 4}, actualSubTopic: actualSubTopic }
		localStorage.setItem('topics', JSON.stringify(newTopics))
	}
	return newState
}


const setActualSubTopic = (newState, data) => {
	const topic = newState.topics.find(topic => topic.id === data.topicId)
	const subTopic = topic.subTopics.find(subTopic => subTopic.id === data.subTopicId)
	console.log(data)
	console.log(subTopic)
	newState = { ...newState, actualSubTopic: { topicId: data.topicId, subTopicId: data.subTopicId, subTopic} }
	return newState
}

const setCandidateForDeletion = (newState, data) => {
	switch (data.modeDeletion) {
		case 1: // delete  topic
			newState = {
					...newState,
					candidateForDeletion: { 
									topics: [...newState.candidateForDeletion.topics, {topicId: data.payload.topicId}],
									subTopics: newState.candidateForDeletion.subTopics.filter(subTopic => subTopic.topicId !== data.payload.topicId),
									cards: []
							}
					}
			break
		case 2:
			newState = {
				...newState,
				candidateForDeletion: { 
								topics: [...newState.candidateForDeletion.topics],
								subTopics: [...newState.candidateForDeletion.subTopics, { topicId: data.payload.topicId, subTopicId: data.payload.subTopicId }],
								cards: []
						}
				}
			break
		default:
			break
	}

	return newState
}


const unsetCandidateForDeletion = (newState, data) => {
	switch (data.modeDeletion) {
		case 1: // delete  topic
			newState = {
					...newState,
					candidateForDeletion: { 
									topics: newState.candidateForDeletion.topics.filter(topic => topic.topicId !== data.payload.topicId), 
									subTopics: newState.candidateForDeletion.subTopics,
									cards: []
							}
					}
			

			break
		case 2:
			newState = {
				...newState,
				candidateForDeletion: { 
								topics: newState.candidateForDeletion.topics,
								subTopics: newState.candidateForDeletion.subTopics.filter(subTopic => subTopic.subTopicId !==  data.payload.subTopicId),
								cards: []
						}
				}
			break
		default:
			break
	}

	return newState
}

const deleteCandidateForDeletion = (newState) => {
	let newActualSubTopic = newState.actualSubTopic
	const newTopics = newState.topics.filter(topic => {
		if (newState.candidateForDeletion.topics.find(candidateTopic => candidateTopic.topicId === topic.id)) {
			if (newActualSubTopic.topicId === topic.id) {
				newActualSubTopic = {
					topicId: null,
					subTopicId: null,
					subTopic: null
				}
			}
			return false
		}
		return true
	}).map(topic => {
		if (newState.candidateForDeletion.subTopics.find(candidateSubTopic => candidateSubTopic.topicId === topic.id)) {
			const newSubTopics = topic.subTopics.filter(subTopic => {
				if (newState.candidateForDeletion.subTopics.find(candidateSubTopic => candidateSubTopic.subTopicId === subTopic.id)) {
					if (newActualSubTopic.subTopicId === subTopic.id) {
						newActualSubTopic = {
							topicId: null,
							subTopicId: null,
							subTopic: null
						}
					}
					return false
				} else {
					return true
				}
			})
			return { ...topic, subTopics: newSubTopics }
		} else {
			return topic
		}
	})
	localStorage.setItem('topics', JSON.stringify(newTopics))
	return { ...newState, topics: newTopics, actualSubTopic: newActualSubTopic}
}

export default (state = initialState(), action) => {
	let newState = { ...state, notice: { code: 0 } }
	switch (action.type) {
		case CREATE_TOPIC:
			newState = createTopic(newState, action.data)
			break
		case CREATE_SUB_TOPIC:
			newState = createSubTopic(newState, action.data)
			break
		case SET_ACTUAL_SUB_TOPIC:
			newState = setActualSubTopic(newState, action.data)
			break
		case CREATE_CARD:
			newState = createCard(newState, action.data)
			break
		case SET_WINDOW_SETTINGS_STATE:
			newState = { ...newState, stateWindowSettings: action.data.state }
			break
		case SET_CANDIDATE_FOR_DELETION:
			newState = setCandidateForDeletion(newState, action.data)
			break
		case UNSET_CANDIDATE_FOR_DELETION:
			newState = unsetCandidateForDeletion(newState, action.data)
			break
		case DELETE_CANDIDATE_FOR_DELETION:
			newState = deleteCandidateForDeletion(newState)
			break
		default:
			break
	}

	return newState
}