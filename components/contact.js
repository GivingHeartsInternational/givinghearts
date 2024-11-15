import React, { useState } from "react"

import style from "./style.module.css"

const INITIAL_STATE = {
    name: "",
    email: "",
    message: "",
}

const ContactForm = (props) => {
    //const { t } = useTranslation('forms');

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [sent, setSent] = useState(false)

    const submitForm = (e) => {
        e.preventDefault()
        console.log(formData)

        //const subject = "Повідомлення з сайту fastcargo.com.ua";
        //sendMail(formData, subject);
        //setSent(true)

        //props.closeForm && props.closeForm();
        setFormData(INITIAL_STATE)
        //	alert("Done") ///////////////////// TRANSLATE !
        ////if error
        //setSent(true); !!!!!!!!!!!!!!!!!!!!!!!!!!!11
    }

    const closePopup = () => {
        //props.closeForm && props.closeForm();
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="uk-container-small uk-margin-auto uk-text-center">
			<div className={props.className}>
				<form className={style.contact__form} onSubmit={submitForm}>
					<h2 >Contact us</h2>

					{!sent && (
						<>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Name"
								required={true}
							/>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email"
								required={true}
							/>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								placeholder="Message"
								required={true}
							/>
							<input type="submit" className="uk-button-bold" value="Send" />
						</>
					)}

					{/*sent && (
						<div style={{ textAlign: "center" }}>
							<p>Message Sent</p>
							<button className="uk-button-bold" onClick={closePopup}>
								Ок
							</button>
						</div>
					)*/}
				</form>
			</div>
		</div>
    )
}

export default ContactForm

/*
import { useState } from 'react';
import style from './style.module.scss';
import { useTranslation } from 'next-i18next';

import { sendMail } from '../../functions.js';


//import MessageSent from '../MessageSent';

const INITIAL_STATE = {
	name: "",
	email: "",
	message: ""
}

const ContactForm = (props: any) => {

	   const { t } = useTranslation('forms');

	const [formData, setFormData] = useState(INITIAL_STATE)
	 	const [sent, setSent] = useState(false)

	const submitForm = (e: any) => {
		e.preventDefault();
		console.log(formData)

		const subject = "Повідомлення з сайту fastcargo.com.ua";
		sendMail(formData, subject);
	setSent(true);


		//props.closeForm && props.closeForm();
		setFormData(INITIAL_STATE);
		//alert('Done');///////////////////// TRANSLATE ! 
		////if error
		//setSent(true); !!!!!!!!!!!!!!!!!!!!!!!!!!!11 
	}


	const closePopup = () => {
		props.closeForm && props.closeForm();
	} 

	const handleChange = (e: any) => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}


	return (

		<>
		<div className={props.className}>
		 
		 
		 
			<form className={style.contact__form} onSubmit={submitForm}>
				<h3>{t('contact-us')}</h3>

				 {!sent && 
				 	<>
				<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('name')} required={true} />
				<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('email')} required={true} />
				<textarea name="message" value={formData.message} onChange={handleChange} placeholder={t('message')} required={true} />
				<input type="submit" className="btn" value={t('send')} />
				</>
 				}

 				{sent &&
			<div style={{    textAlign: "center"}}>
				<p>{t('messageSent')}</p>
				<button className="btn" onClick={closePopup}>Ок</button>
			</div>
		} 

			</form>
		 

		 
		</div>

	 

</>
	);
}

export default ContactForm;



*/