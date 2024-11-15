 import Image from 'next/image';
import styles from './style.module.css';
import { useTranslation } from 'next-i18next';

 const IconsWork = () => {

const { t } = useTranslation('icons');

   return (

 <div className={styles.workIcons}>
                <div className={styles.workIcons__item}>
                  <Image
                    src="/images/icons/mail.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  <p>{t('leave-request')}</p>
                </div>
                <div className={styles.workIcons__arrow}>
                 <Image
                    src="/images/icons/arrow.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  </div>
                <div className={styles.workIcons__item}>
                  <Image
                    src="/images/icons/handshake.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  <p>{t('discuss-terms')}</p>
                </div>
<div className={styles.workIcons__arrow}>
                 <Image
                    src="/images/icons/arrow.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  </div>
                <div className={styles.workIcons__item}>
                  <Image
                    src="/images/icons/trolley.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  <p>{t('get-cargo')}</p>
                </div>
<div className={styles.workIcons__arrow}>
                 <Image
                    src="/images/icons/arrow.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  </div>
                <div className={styles.workIcons__item}>
                  <Image
                    src="/images/icons/express-delivery.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  <p>{t('transport-cargo')}</p>
                </div>
              </div>
     );
 }

 export default IconsWork;