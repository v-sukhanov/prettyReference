import React from 'react'

const OpenSetting = ({ setWindowSettingsState }) => {
	const clickDeleteTopiSubTopicHandler = (e) => {
		setWindowSettingsState({mode: 2})
	}
	return (
		<div
			className="w-100"
			style={{position: 'absolute', top: '-76px', background: '#3f3f3f'}}
		>
			<div
				className="settings__item p-2 pl-4"
				style={{height: '38px', borderTop: '1px solid rgba(255, 255, 255, .2)', cursor: 'pointer', color: 'rgb(148, 148, 148)', fontSize: '13px'}}
				onClick={clickDeleteTopiSubTopicHandler}
			>
				Удалить топик/саб топик
			</div>

				<div className="settings__item p-2 pl-4" style={{height: '38px', borderTop: '1px solid rgba(255, 255, 255, .2)', cursor: 'pointer', color: 'rgb(148, 148, 148)', fontSize: '13px'}}>
				Удалить ссылку
				</div>
		</div>
	)
}

const DeleteSetting = ({ setWindowSettingsState, deleteCandidateForDeletion }) => {

	const clickDoneHandler = (e) => {
		setWindowSettingsState({mode: 0})
		deleteCandidateForDeletion()
	}

	return (
		<div
			className="settings__done w-100 h-100 bg-info p-2 text-center text-white"
			onClick={clickDoneHandler}	
		>
			Готово
		</div>
	)
}

const Settings = ({ modeSettings, setWindowSettingsState, deleteCandidateForDeletion }) => {

	switch (modeSettings) {
		case 1:
			return <OpenSetting setWindowSettingsState={setWindowSettingsState}/>
		case 2:
			return <DeleteSetting setWindowSettingsState={setWindowSettingsState} deleteCandidateForDeletion={deleteCandidateForDeletion}/>
		default:
			return false
	}
	
}

const IconSettings = ({modeSettings, clickSettingsHandler}) => {
	if (modeSettings === 0 || modeSettings ===1) {
		return (
			<i
				className="material-icons settings__icon"
				style={{color: modeSettings ? 'white' : 'rgb(148, 148, 148)', cursor: 'pointer', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
				onClick={clickSettingsHandler}
			>
				settings
			</i>
		)
	} else {
		return false
	}
	
}

const WindowSettings = ({ modeSettings, setWindowSettingsState, deleteCandidateForDeletion }) => {

	const clickSettingsHandler = (e) => {
		setWindowSettingsState({mode: modeSettings !== 1 ? 1 : 0})
	}

	return (
		<div style={{height: '5vh', borderTop: '1px solid rgba(255, 255, 255, .2)', position: 'relative', userSelect: 'none'}}>
			<Settings modeSettings={modeSettings} setWindowSettingsState={setWindowSettingsState} deleteCandidateForDeletion={deleteCandidateForDeletion}/>
			<IconSettings modeSettings={modeSettings} clickSettingsHandler={clickSettingsHandler}/>
		</div>
	)
}

export default WindowSettings	