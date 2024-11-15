 
import React, { useState, useEffect } from 'react';
//import CallbackForm from './CallbackForm';

import style from './style.module.scss'

const MessageSent = (props: any) => {

//	const [enabled, setEnabled] = useState(true);
	//const [scrollY, setScrollY] = useState(""); //???

/*
	const onSubmitHandler = () => {
		closeForm();
	}

	const closeForm = () => {
		props.closeForm();
	}
	*/
	useEffect(() => {
	//	if(window.innerWidth < 768) setScrollY(window.scrollY);
	}, []);

	return(
		<div>
			 	<div>
				<h3>Sent!</h3>
				<button className="btn btn-yellow">Ok</button>
			</div>
			<div className={style.overlay} onClick={closeForm}></div>
		</div>
	);
}

export default MessageSent;


/*
	const [ enabled, setEnabled ] = useState(true);
	return (
		<div>
				<h3>Sent!</h3>
				<button className="btn btn-yellow">Ok</button>
			</div>
	);
	*/