import React from "react"
import Link from "next/link"
import Image from "next/image"

const Footer = ({ phone }) => {
  const scrollTop = () => {
    if (typeof window !== undefined) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }
  return (
    <div className="footer uk-section black-section">
      <div className="uk-container uk-container-large">
        <div className="footer-scrollTop">
          <Image
            src="/images/back-top-icon.webp"
            alt="footer arrow"
            width={43}
            height={43}
            onClick={scrollTop}
            className="footer-scrollTop"
            loading="eager"
            priority={true}
          />
        </div>
        {phone && <p>PHONE: {phone}</p>}
        <Link href="/">
          <a>
            <h1>
              Giving <span className="change-color">Heart</span>
            </h1>
          </a>
        </Link>
        <h5>GIVINGHEART © 2022 • PRIVACY POLICY</h5>
        {/*  <p>+ 180 000 435</p>*/}
      </div>
    </div>
  )
}

export default Footer
