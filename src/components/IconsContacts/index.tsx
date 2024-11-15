 import Image from 'next/image';
import styles from './style.module.css';
import { useTranslation } from 'next-i18next';
 import {DataContext} from '../../../pages/_app'

 import { useContext } from 'react'


 const IconsContacts = () => {

const { t, i18n } = useTranslation('icons');

  const data = useContext(DataContext)

 
   return (
 
<div className={styles.contactsIcons} >
          <div className={styles.contactsIcons__item}>
          <div>
            <Image
              src="/images/icons/phone.png"
              alt="Picture of the author"
              width={100}
              height={100}
              loading="eager"
            />
            </div>
            <div  className={styles.contactsIcons__text}>
              <p>Телефон </p>
              <p>{data?.phone1}</p>
            {/*
              <p>+38 073 7330307 (ua)</p> 
             <p>+48 698 995 689 (pl)</p>  */}
            </div>
             
          </div>
          <div className={styles.contactsIcons__item}>
            <div>
            <Image
              src="/images/icons/local.png"
              alt="Picture of the author"
              width={100}
              height={100}
              loading="eager"
            />
            </div>
               <div  className={styles.contactsIcons__text}>
              <p>{t('office-ukr')}</p>
              <p>{data?.addressUkr}</p>
              {/*<p>{t('address-ukr')}</p> */}
             <p>{t('office-pl')}</p> 
             <p>{data?.addressPl}</p> 
             {/* <p>{t('address-pl')}</p>*/}
            </div>
          </div>
          <div className={styles.contactsIcons__item}>
           <div>
            <Image
              src="/images/icons/letter-circle.png"
              alt="Picture of the author"
              width={100}
              height={100}
              loading="eager"
              className={styles.contactsIcons__img}
            />
            </div>           
            <div className={styles.contactsIcons__text}>
              <p>E-mail </p>
             <p>{data?.email}</p>
 
            </div>
          </div>
        </div>
    
 
     );
 }

 export default IconsContacts;