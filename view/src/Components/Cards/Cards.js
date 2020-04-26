import React from 'react'
import Card from './Card/Card'


const Cards = ({ cards }) => {

	console.log(cards)

	return (
		<div>
			{ cards && !!cards.length && cards.map((card, key) => <Card card={card} key={key}/>)}
		</div>
	)

}

export default Cards