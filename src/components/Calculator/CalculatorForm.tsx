import { useState } from 'react';
import style from './style.module.scss';


import { useTranslation } from 'next-i18next';

 import { sendMail } from '../../functions.js';

 
  


const INITIAL_STATE = {
	type: "",
	cost: "",
	weight: "",
	volume: "",
	addInfo: "",
	paper: "",
	name: "",
	phone: "",
	email: ""
}

 

const CARGO_TYPES = [
"autoparts",
"electrical",
"phones-computers",
"clothing",
"textiles",
"equipment",
"food-group",
"alcohol",
"tobacco",
"households",
"cosmethicts",
"other"
]

const CalculatorForm = (props: any) => {

	   const { t } = useTranslation('forms');

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [sent, setSent] = useState(false)

	const submitForm = (e: any) => {
		e.preventDefault();
		console.log(formData)

		const subject = "Запит на розрахунок вартості доставки з сайту fastcargo.com.ua";
		sendMail(formData, subject);



		props.closeForm && props.closeForm();
		setFormData(INITIAL_STATE);
		alert('Done'); //// TRANSLATE  if error
	}

	const handleChange = (e: any) => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}


	return (
		<div className={props.style}>

		{!sent &&
		 <form className={style.calc__form} onSubmit={submitForm} style={{maxWidth: '300px'}}>
		 <h3>{t('calc-cargo-value')}</h3>
		 
				 
				<select name="type"  onChange={handleChange} value={formData.type} required={true} >
				<option value={0}>{t('select-option')}</option>
					{CARGO_TYPES.map(i => (
						<option value={t(i)}>{t(i)}</option>
					))}
				</select>
				<label>{t('cargo-attrs')}</label>
				<input type="text" name="cost" value={formData.cost} onChange={handleChange} placeholder={t('price')} required={true} />
 				<input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder={t('weight')} required={true} />
 				<input type="text" name="volume" value={formData.volume} onChange={handleChange} placeholder={t('volume')} required={true} />
 				<label>{t('papers')}</label>
 				<input type="text" name="paper" value={formData.paper} onChange={handleChange} placeholder={t('set-doc-type')}   />
				<label>{t('add-info')}</label>
				<input type="text" name="addInfo" value={formData.addInfo} onChange={handleChange} placeholder={t('add-info')}   />
 				<label>{t('contacts')}</label>
 				<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('name')} required={true} />
 				<input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('phone')} required={true} />
 				<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('email')} required={true} />

				<input type="submit" className="btn" value={t('calc-value')} />
			</form>

		}


		{ sent &&
			<p>Message sent</p>
		}
		</div>
	);
}

export default CalculatorForm;