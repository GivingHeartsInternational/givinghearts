import { useState } from 'react';
import style from './style.module.scss';


import { useTranslation } from 'next-i18next';

import { sendMail } from '../../functions.js';


 

const INITIAL_STATE = {
	name: "",
	phone: ""
}

const CallbackForm = (props: any) => {

	   const { t } = useTranslation('forms');

	const [formData, setFormData] = useState(INITIAL_STATE);
	const [sent, setSent] = useState(false);



	const submitForm = (e: any) => {
		e.preventDefault();
		console.log(formData);

		 
		const subject = "Запит на дзвінок з сайту fastcargo.com.ua";
		sendMail(formData, subject);



		props.closeForm && props.closeForm();
		setFormData(INITIAL_STATE);
		alert('Done'); ////translate !!! 
		//setSent(true); !!!!!!!!!!!!!!!!!!!!!!!!!!!11  if error
	//	alert("Send")
	}

	const handleChange = (e: any) => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}


	return (
		<div className={props.className}>
			<form className={style.contact__form} onSubmit={submitForm}>

					{ !sent && (
						<>
						<h3>{t('get-price')}</h3>
				<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('name') } required={true}/>
				<input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('phone')} required={true} /> 
				<input type="submit" className="btn" value={t('send')} />
								<p>{t('data-used')}</p>
								</>
								)}


					
{/*
			{ sent && (
				<div>
					<h3>Message Sent!</h3>
					<br />
					{ props.closeForm && <button className="btn btn-yellow"  onClick={() => props.closeForm()}>Ok</button> }
				</div>
			)}
		 **/}
			</form>

 
		</div>
	);
}

export default CallbackForm;


/*
	e.preventDefault();
		
		const { name, email, text } = values;
		const time = new Date().toLocaleString();
		const subject = "Message from site solostepsolution.com";
		const adress = props.data.email; //////////////////чи є !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		const data = { name, email, subject, text, time, adress }

//console.log(props)

		fetch(`https://yanmall.leopolis.org.ua/mail.php`, {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data) //'name=danik'
		}).then((response) => response.text())
		  .then((text) => {

		  })
		  .catch((error) => {
		  	//console.log(error)
			});

		props.firebase.messages().push({
      name: name,
      email: email,
      text: text,
      createdAt: props.firebase.serverValue.TIMESTAMP
    });

		setValues({name: "", email: "", text: ""});
		setSent(true)
		*/