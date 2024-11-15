import styles from '../../../styles/Styles.module.css' // переставити
import Image from 'next/image'
import localStyle from './style.module.scss'; 

 import { withFirebase } from '../Firebase';

 import {DataContext} from '../../../pages/_app'

const ContactPhones = (props) => {
	return (

     <DataContext.Consumer>
   { data => 
		<div className={styles.phones} style={{display: 'flex', color: 'white', marginRight: '50px',  alignItems: "center", 
		flexDirection:  props.style == "footer" ? "column" : "row"}}>
		{ props.style != "footer" &&
            <Image
              src="/images/icons/phone-white.png"
              alt="Picture of the author"
                 width={15}
              height={15}
              loading="eager"
                    priority={true}
              
            />
         }
				<div className={styles.phones__item}><a href={`tel:${data?.phone1}`}>{data?.phone1}</a></div>
				{/* data?.phone2 && <div className={styles.phones__item}><a href={`tel:${data?.phone2}`}>{data?.phone2}</a></div> */ }
			</div>
    }
    </DataContext.Consumer>
		);
}

export default ContactPhones;