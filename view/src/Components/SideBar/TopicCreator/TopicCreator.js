import React from 'react'



const TopicCreator = ({ createTopic }) => {

	const keyDownHandler = (e) => {
		if (e.keyCode === 13 && e.currentTarget.value.trim()) {
			createTopic(e.currentTarget.value.trim())
			e.currentTarget.value = ''
		}
	}

	return (
		<div className="input-groupmb-4" style={{height: '13vh', borderBottom: '1px solid rgba(255, 255, 255, .2)', position: 'relative'}}>
			<input
					type="text"
					className="form-control m-0"
					placeholder="Создайте топик" 
					aria-describedby="basic-addon1"
					onKeyDown={keyDownHandler}
					style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%'}}
			/>
		</div>
	)
}

export default TopicCreator