import Link from 'next/link';
import Image from 'next/image';

import styles from './style.module.css';

const Logo = (props: any) => {
	return (
		<div className={props.style == "header" ? styles.headerLogo : styles.logo} >
			<Link href="/">
			<a>
			<Image
              src="/images/transp_l55.png"
              alt="Picture of the author"
                 width={200}
              height={138}
       loading="eager"
       priority={true}
               
            />
    		{/* <a style={{color: 'darkgreen', fontWeight: "bold", textTransform: 'uppercase', fontSize: '20px' }}>Fast Cargo</a> */}
    		</a>
  		</Link>
		</div>
		)
}

export default Logo;
