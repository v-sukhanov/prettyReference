import React from 'react'


const Card = ({ card }) => {


	return (
		<a className="block card d-inline-block text-info ml-2 mr-2 mb-3  " style={{width: '15rem', overflow: 'hidden'}} href={card ? card.url : ''} target="_blank">
			<img className="card-img-top" src={card ? card.image : ''} alt="Card image cap" style={{width: '100%', height: '120px', objectFit: 'cover'}} key={card.id}/>
			<div className="card-body pl-1 pr-1 pt-2 pb-0  text-wrap" style={{height: '60px', overflow: 'hidden'}}>
				<h6 className="card-title p-0 m-0" style={{fontSize: '13px', height: '48px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{card ? card.title : ''}</h6>
				{/* {card ? card.title : ''} */}
			</div>
			<div className="text-secondary  pt-0 pl-1" style={{height: '25px'}}>
				{card.source}
				{/* <i className="material-icons" style={{fontSize: '17px', position: 'absolute', right: '5px', bottom: '5px'}} onClick={deleteClickHandler} data-id={card.id}>delete</i> */}
			</div>
			{/* <iframe width="480" height="360" src="https://www.youtube.com/embed/xFa2_PVMeDQ" frameborder="0" allowfullscreen></iframe> */}
		</a>
	)
}


export default Card