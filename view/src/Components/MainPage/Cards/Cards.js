import React from 'react'
import Card from './Card/Card'
import SimpleBar from 'simplebar-react'

const Cards = ({ cards }) => {


	return (
		<SimpleBar className="mt-5" style={{height: '85vh'}} autoHide={false}>
			{ cards && !!cards.length && cards.map((card) => <Card card={card}  key={card.id}/>)}
		</SimpleBar>
	)

}

export default Cards