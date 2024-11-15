import styles from '../../../styles/Styles.module.css' // переставити
import Image from 'next/image'
import localStyle from './style.module.scss'; 

import {DataContext} from '../../../pages/_app'

const ContactSocial = () => {
	return (
     <DataContext.Consumer>
   { data => 
		<div className={localStyle.social}  >
								<div className={localStyle.social__item}>
									<a href={data?.socialFacebook}>
                  <Image
                    src="/images/icons/facebook.png"
                    alt="facebook"
                    width={30}
                    height={30}
                    loading="eager"
                    priority={true}
                  />
                   </a>
                </div>

                	<div className={localStyle.social__item}>
                	<a href={data?.socialInstagram}>
                  <Image
                    src="/images/icons/instagram.png"
                    alt="instagram"
                    width={30}
                    height={30}
                    loading="eager"
                    priority={true}
                  />
                   </a>
                </div>

                	<div className={localStyle.social__item}>
                   <a href={data?.socialTelegram}>
                      <Image
                        src="/images/icons/telegram.png"
                        alt="telegram"
                        width={30}
                        height={30}
                    loading="eager"
                        priority={true}
                      />
                     </a>
                </div>

                	<div className={localStyle.social__item}>
	                	 

	                 <a href={data?.socialWhatsapp}>
                  <Image
                    src="/images/icons/whatsapp.png"
                    alt="youtube"
                    width={30}
                    height={30}
                    loading="eager"
                    priority={true}
                  />
                   </a>
                </div>
                </div>
              }
             </DataContext.Consumer> 
		);
}

export default ContactSocial;