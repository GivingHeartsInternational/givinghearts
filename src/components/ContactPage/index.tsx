import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactForm from '../ContactForm/ContactForm';
import IconsContacts from '../IconsContacts';

 import CallbackButton from '../CallbackForm/CallbackButton';

const ContactsPage= () => {
  const { t, i18n } = useTranslation('common');
 
  return (
      <><div  className={styles.sliderStyle}></div>
            <div  style={{backgroundImage: 'url(/images/cargo4.jpg)', backgroundSize: 'cover'}} className={`${styles.page} ${styles.page100vh}`}>
    <div className={`${styles.container} ${styles.containerCentered}`}>
      <main className={styles.main}>
        <h2>{t('contacts-title')}</h2>
        {/* <ContactForm /> */}
        <IconsContacts />
        <CallbackButton />


 


      </main>
    </div>
    </div>
    </>
  )
}

 


export default ContactsPage
