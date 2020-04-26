import React from 'react'


const TopicList = ({ topics, actualTopic, deleteTopic, setActualTopic }) => {

	const clickTopicHandler = (e) => {
		if (e.target.className !== 'material-icons text-white') {
			setActualTopic(e.currentTarget.dataset.id)
		}
	}

	return (
		<div>
			{
				topics && topics.map(((topic, key) => {
					return (
						<div style={{position: 'relative'}} key={key} onClick={clickTopicHandler} data-id={topic.id}>
							<li className={topic.id === actualTopic ? "list-group-item bg-primary list__item mb-2 rounded " : "list-group-item bg-secondary list__item mb-2 rounded "}> <span>{topic.title}</span> </li>
							<i
								className="material-icons text-white"
								style={{position: 'absolute', right: '10px', top: '14px', fontSize: '18px', cursor: 'pointer'}}
								data-id={topic.id}
								onClick={e => deleteTopic(e.currentTarget.dataset.id)}
							>
								delete
							</i>
						</div>
					)
					
				}))
			}
		</div>
	)
}

export default TopicList