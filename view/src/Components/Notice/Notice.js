import React from 'react'

import {connect} from 'react-redux'


const settingsProducer = (notice) => {

	const style = {
		position: 'fixed',
		left: 0,
		top: '-100px',
		zIndex: '9999'
	}

	if (!notice) {
		return {
			class: "d-none",
			style,
			text: ''
		}
	}
	if (notice === 1) {
		return {
			class: "alert alert-warning w-100 text-center animated fadeInDown",
			style: {
				...style,
				'animation': '5s linear appearAndDisappearAlert'
			},
			text: 'Ссылка не имеет превью'
		}
		
	} if (notice === 2) {
		return {
			class: "alert alert-primary w-100 text-center animated fadeInDown",
			style: {
				...style,
				'animation': '5s linear appearAndDisappearAlert'
			},
			text: 'Создайте топик, чтобы добавить ссылку'
		}
	} if(notice === 3) {
		return {
			class: "alert alert-danger w-100 text-center animated fadeInDown",
			style: {
				...style,
				'animation': '5s linear appearAndDisappearAlert'
			},
			text: 'Невалидный url'
		}
	} if(notice === 4) {
		return {
			class: "alert alert-success w-100 text-center animated fadeInDown",
			style: {
				...style,
				'animation': '5s linear appearAndDisappearAlert'
			},
			text: 'Ссылка успешно добавлена!'
		}
	} else {
		return {
			class: "alert alert-light w-100 text-center"
		}
	}
}

const Alert = ({ notice }) => {

	const settings = settingsProducer(notice.code)

	return (
		<div className={settings.class} role="alert" style={settings.style}  key={Date.now()}>
			{settings.text}
		</div> 
	)
}

export default connect(state => ({notice: state.notice}))(Alert)