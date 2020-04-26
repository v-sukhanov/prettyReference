import React from 'react'

const TopicCreator = ({ createTopic }) => {



	const keyDownHandler = (e) => {
		if (e.keyCode === 13 && e.currentTarget.value.trim()) {
			createTopic(e.currentTarget.value.trim())
			e.currentTarget.value = ''
		}
	}

	return (
		<div className="input-groupmb-4 mb-3">
			<input 	
					type="text"
					className="form-control"
					placeholder="Создайте топик" 
					aria-describedby="basic-addon1"
					onKeyDown={keyDownHandler}
			/>
		</div>
	)
}

export default TopicCreator