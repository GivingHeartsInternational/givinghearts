 import Image from 'next/image';
import style from './style.module.css';
import { useTranslation } from 'next-i18next';

 const IconsMain = () => {

const { t } = useTranslation('icons');

   return (

 <div className={style.mainIcons}>
                <div className={style.mainIcons__item}>
                  <Image
                    src="/images/icons/box.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  <p>{t('from-5kg')}</p>
                </div>

                <div className={style.mainIcons__item}>
                  <Image
                    src="/images/icons/handshake.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  <p>{t('without-agents')}</p>
                </div>

                 <div className={style.mainIcons__item}>
                  <Image
                    src="/images/icons/fast-delivery.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  <p>{t('express')}</p>
                </div>

                <div className={style.mainIcons__item}>
                  <Image
                    src="/images/icons/express-delivery.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  <p>{t('diff-cars')}</p>
                </div>

                <div className={style.mainIcons__item}>
                  <Image
                    src="/images/icons/support.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loading="eager"
                  />
                  <p>{t('individual')}</p>
                </div>
              </div>
     );
 }

 export default IconsMain;