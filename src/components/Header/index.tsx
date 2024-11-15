import Logo from '../Logo';
import Navigation from '../Navigation';
import LangSwitch from '../LangSwitch';
import ContactPanel from '../ContactPanel';
import styles from '../../../styles/Styles.module.css' // переставити

import { useState, useEffect } from 'react';


import localStyle from './style.module.css' // 
 import { withFirebase } from '../Firebase';

import {DataContext} from '../../../pages/_app'

const MobileMenuButton = (props) => {
	const handleClick = () => {
		props.toggleMobMenu();
}
	return (
		<div onClick={handleClick} className={localStyle.mobilemenuButton}>
			<span></span>
		</div>
	);
}

const MobileMenu = (props) => {

	const handleClick = () => {
		props.closeMobMenu()
	}

	return (
		<div className="mobilemenu" onClick={handleClick}>
			<Navigation type="mobilemenu" />
		</div>
	);
}

const Header = () => {


	const [showMenu, setShowMenu] = useState(false);

	const toggleMobMenu = () => {
		setShowMenu(!showMenu);
	}

	const closeMobMenu = () => {
		setShowMenu(false);
	}


	return (

		<>
		<p>Header</p>

	{/*
	 
	 <DataContext.Consumer>
	 { data => 
		 <>
	  
		
		<div className={styles.header}>
		 
		<Logo style="header" />
			<div className="container header-container">
			 <ContactPanel /> 
			<LangSwitch />
			</div>
		<MobileMenuButton toggleMobMenu={toggleMobMenu} />  
 
		</div>
		{ showMenu &&	<MobileMenu showMenu={showMenu} closeMobMenu={closeMobMenu} /> }

		</>
	}
	 </DataContext.Consumer>
		 
*/}
	</>

	)
}

export default Header;
