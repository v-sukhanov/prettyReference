import React from 'react'


const Card = ({ card, key }) => {
	console.log(card)
	return (
		<a className="block card d-inline-block text-info ml-2 mr-2 mb-3" style={{width: '15rem'}} href={card && card.url ? card.url.content : ''} target="_blank">
			<img className="card-img-top" src={card && card.image ? card.image.content : ''} alt="Card image cap" style={{width: '100%', height: '120px', objectFit: 'cover'}}/>
			<div className="card-body pl-1 pr-1 pt-2 pb-0 " style={{height: '75px', overflow: 'hidden'}}>
				<h6 className="card-title" style={{fontSize: '13px'}}>{card && card.title ? card.title.content: ''}</h6>
			</div>
			{/* <iframe width="480" height="360" src="https://www.youtube.com/embed/xFa2_PVMeDQ" frameborder="0" allowfullscreen></iframe> */}
		</a>
	)
}


export default Card