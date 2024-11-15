import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

import style from './style.module.scss'

const ContactPopup = (props: any) => {

	const [enabled, setEnabled] = useState(true);
	//const [scrollY, setScrollY] = useState(""); //???

	const onSubmitHandler = () => {
		closeForm();
	}

	const closeForm = () => {
		props.closeForm();
	}

	useEffect(() => {
	//	if(window.innerWidth < 768) setScrollY(window.scrollY);
	}, []);

	return(
		<div>
			 <ContactForm className={style.contact__popup} closeForm={closeForm} /> 
			<div className={style.overlay} onClick={closeForm}></div>
		</div>
	);
}

export default ContactPopup;


//overlay
//<CalculatorForm scrollY={scrollY}
//className="booking-form_popup" 