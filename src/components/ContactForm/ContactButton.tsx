import ContactPopup from './ContactPopup';
import { useState } from 'react';
import Image from 'next/image'

import style from './style.module.scss';

const ContactButton = (props:any) => {

	const [showForm, setShowForm] = useState(false);

	const onClickHandler = () => {
		showForm ? null : setShowForm(true);
	}

	const closeForm = () => {
  	setShowForm(false)
	}

	return(
		<div className={`${style.contactPopupButton}`}>
	   <Image
          src="/images/icons/chat.png"
          alt="chat"
          width={60}
          height={60}
          onClick={onClickHandler}
          className={style.chatButton}
        /> 
			{showForm && <ContactPopup closeForm={closeForm} />}
		</div>
	);
}


export default ContactButton;