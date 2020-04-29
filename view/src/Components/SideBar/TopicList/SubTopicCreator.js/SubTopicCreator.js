import React from 'react'


const SubTopicCreator = ({ createSubTopic, topicId }) => {
	const keyDownHandler = (e) => {
		if (e.keyCode === 13 && e.currentTarget.value.trim()) {
			createSubTopic(e.currentTarget.value.trim(), topicId)
			e.currentTarget.value = ''
		}
	}

	return (
		<div className="input-groupmb-4 pl-3 pr-3 pt-2 pb-2" style={{marginLeft: '5px'}}>
			<input 	
					type="text"
					className="form-control"
					style={{width: '100%', height: '25px', fontSize: '10px'}}
					placeholder="Создайте саб топик" 
					aria-describedby="basic-addon1"
					onKeyDown={keyDownHandler}

			/>
		</div>
	)
}

export default SubTopicCreator