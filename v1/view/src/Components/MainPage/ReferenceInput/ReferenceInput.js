import React, { useState } from 'react'



const ReferenceInput =  ({ createCard }) => {

	const [inputText, setInputText] = useState('')
	const changeInputHandler = (e) => {
		setInputText(e.currentTarget.value)
	}

	const clickInputHandler = (e) => {
		if (e.keyCode === 13 && e.currentTarget.value.trim() && e.currentTarget.value.match( /^(https?:\/\/)?/)) { // регулярка не очень ([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$
			createCard(e.currentTarget.value)
			setInputText('')
		}
	}

	return (
		<div className="input-groupmb-4" style={{position: 'absolute', width: '80%', bottom: '20px', left: '50%', transform: 'translate(-50%, 0)'}}>
			
			<input 	
					type="text"
					className="form-control"
					placeholder="Вставьте ссылку" 
					aria-describedby="basic-addon1" 
					value={inputText} onChange={changeInputHandler}
					onKeyDown={clickInputHandler}
			/>

			<i 	
				className="material-icons"
				style={{position: 'absolute', right: '10px', bottom: '5px', cursor: 'pointer', color: 'grey'}}
				onClick={e => setInputText('')}
			>
					close
			</i>
		</div>
	)
}

export default ReferenceInput

