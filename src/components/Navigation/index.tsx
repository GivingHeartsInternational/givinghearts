import Link from 'next/link'
import styles from './style.module.css'

import ContactSocial from '../ContactPanel/ContactSocial';

  


import Image from 'next/image';

import { useTranslation } from 'next-i18next';

import ContactButton from '../ContactForm/ContactButton';
 
const Navigation = (props: any) => {

	const { t } = useTranslation('navigation');



	return (
		<div className={styles.navPanel} style={props.type && props.type == "mobilemenu" && {display: "block"}}>
		<div className={styles.nav}>
			<Link href="/">
    		<a>{t('homepage')}</a>
  		</Link>
			<Link href="/about">
    		<a>{t('about')}</a>
  		</Link>
  		<Link href="/services">
    		<a>{t('services')}</a>
  		</Link>
  		<Link href="/calculator">
    		<a>{t('calculator')}</a>
  		</Link>
  		<Link href="/how-we-work">
    		<a>{t('how-we-work')}</a>
  		</Link>
  		<Link href="/information">
    		<a>{t('information')}</a>
  		</Link>
  		<Link href="/contacts">
    		<a>{t('contacts')}</a>
  		</Link>

  		{props.type && props.type == "mobilemenu" && <ContactSocial />}
  		</div>



  		<div className={styles.chat}>
 
                  <ContactButton />
  		</div>
		</div>
		)
}

export default Navigation;
