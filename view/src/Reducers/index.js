import randToken from 'rand-token'

import { CREATE_CARD, CREATE_TOPIC, DELETE_TOPIC, SET_ACTUAL_SUB_TOPIC, DELETE_CARD, CREATE_SUB_TOPIC } from './types'


const initialState = () => {
	const topics = JSON.parse(localStorage.getItem('topics'))

	return { topics: topics ? topics : [], actualSubTopic: { topicId: null, subTopicId: null, subTopic: null }, notice: { code: 0 }}
}

const createTopic = (newState, { topicTitle }) => {
	const newId = randToken.uid(16)
	const newTopics = [...newState.topics]
	newTopics.unshift({id: newId, title: topicTitle, subTopics: []})
	newState = { ...newState, topics: newTopics}
	localStorage.setItem('topics', JSON.stringify(newTopics))
	return newState
}

const deleteTopic = (newState, { topicId }) => {
	const newTopics = newState.topics.filter(topic => topic.id !== topicId)
	let newActualTopic = null
	if (newTopics.length) {
		newActualTopic = newTopics[0].id
	}
	newState = { ...newState, topics: newTopics, actualTopic: newActualTopic }
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
		newState = {... newState, notice: {code: 2}}
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

const deleteCard = (newState, { cardId }) => {
	const newTopics = newState.topics.map(topic => {
		if (topic.id === newState.actualTopic) {
			return { ...topic, cards: topic.cards.filter(card => card.id !== cardId) }
		} else {
			return topic
		}
	})
	localStorage.setItem('topics', JSON.stringify(newTopics))
	
	return { ...newState, topics: newTopics}
}


const setActualSubTopic = (newState, data) => {
	const topic = newState.topics.find(topic => topic.id === data.topicId)
	const subTopic = topic.subTopics.find(subTopic => subTopic.id === data.subTopicId)
	console.log(data)
	console.log(subTopic)
	newState = { ...newState, actualSubTopic: { topicId: data.topicId, subTopicId: data.subTopicId, subTopic} }
	return newState
}

export default (state = initialState(), action) => {
	let newState = { ...state, notice: { code: 0 } }
	switch (action.type) {
		case CREATE_TOPIC:
			newState = createTopic(newState, action.data)
			break
		case DELETE_TOPIC:
			newState = deleteTopic(newState, action.data)
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
		case DELETE_CARD:
			newState = deleteCard(newState, action.data)
			break
		default:
			break
	}

	return newState
}