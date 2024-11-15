import { useState, useEffect } from 'react';
import CalculatorForm from './CalculatorForm';

import style from './style.module.scss'

const CalculatorPopup = (props: any) => {

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
			<CalculatorForm className="calc__popup" closeForm={closeForm} />
			<div className={style.overlay} onClick={closeForm}></div>
		</div>
	);
}

export default CalculatorPopup;


//overlay
//<CalculatorForm scrollY={scrollY}
//className="booking-form_popup" 