import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import Nav from "./nav"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

import style from "./style.module.css"

const Header = ({categories, projects}) => {

  const [showMobileButton, setShowMobileButton]= useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)


  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

useEffect(() => {

  if(window.innerWidth < 768) {
    setShowMobileButton(true)
    //setShowMobileMenu(false)
  }

  if(window.innerWidth > 768) {
    setShowMobileMenu(true) //переробити !!! 
  }

})

  return (
    <>
    <div
      className={style.header}
    >
      <div>
       
        <Link href="/">
          <a>
            <h1>
              Giving <span className="change-color">Heart</span>
            </h1>
          </a>
        </Link>


 
      </div>

      { showMobileButton &&
        <div onClick={toggleMobileMenu} className={style.mobileMenuButton}>
        <span></span> 
          </div>
         }


   
    {showMobileMenu && <Nav categories={categories} projects={projects} />}
     </div>
     </>
  )
}

export default Header;

//header_img.jpg


/*
      style={{
        backgroundAttachment: "fixed",
        textAlign: "center",
        backgroundImage: "url('/images/header_img.jpg')",
      }}


        <div className={style.social}>
          <a href="https://facebook.com">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://instagram.com">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>


      */