import React, {useState, useEffect} from 'react'; 

const Image = (props) => {

	const [loading, setloading] = useState(true);

	return (
		<>
			<div className="lds-dual-ring" style={loading ? {} : {display: 'none'}}></div>
			<img src={props.src} onLoad={() =>{setloading(false)}} width={props.width} style={loading ? {display: 'none'} : {}}/>
		</>
	)
}

export default Image;