import CalculatorPopup from './CalculatorPopup';
import { useState } from 'react';
 


const CalculatorButton = () => {

	const [showForm, setShowForm] = useState(false);

	const onClickHandler = () => {
		showForm ? null : setShowForm(true);
	}

	const closeForm = () => {
  	setShowForm(false)
	}

	return(
		<>
			<button onClick={onClickHandler} className="btn">Calc</button>
			{showForm && <CalculatorPopup closeForm={closeForm} />}
		</>
	);
}


export default CalculatorButton;