import Image from 'next/image';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import CallbackForm from '../CallbackForm/CallbackForm';

import style from './style.module.css';

import { useState } from 'react';

import LoadContext from '../context'



import { useTranslation } from 'next-i18next';

 
 


const settings = { ///////////////////я для чого
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

const sliderStyle: object = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '2',
    top: '0',
    opacity: '0.5',
    backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.9) 19.7%, rgba(0, 0, 0, 0.7) 55.28%)`
}

 
const Slider = () => {

    const { t } = useTranslation('common');


    const handleLoading = () => {
      console.log("e1e")
     // setLoad(true)
      //setLoad(true)
    }

  //const [load, setLoad] = useState(false);

//console.log(load)

	return (
  			<div className={style.homepage__slider}>

       

         
           <div>
          <AliceCarousel  autoPlay  autoPlayInterval={4500} infinite disableDotsControls disableButtonsControls>
            <Image
  			      src="/images/cargo1.jpg"
  			      alt="Picture of the author"
  			      width={1200}
  			      height={600}
              layout="responsive"
     
  			    />
  			    <Image
  			      src="/images/cargo2.jpg"
  			      alt="Picture of the author"
  			      width={1200}
  			      height={600}
              layout="responsive"
  			    />
 <Image
              src="/images/cargo7.jpg"
              alt="Picture of the author"
              width={1200}
              height={600}
              layout="responsive"
            />
 
     
          </AliceCarousel>

            <div style={sliderStyle} className="slider-overlay"></div>
           </div>
         
            
          <div className={style.slider__info}>
            <div className={style.slider__left}>
              <h2>{t('slider-title')}</h2>
              {/* <p>{t('slider-desc')}</p> */}
      
            </div>
            <div className={style.slider__right}>
              <CallbackForm />
              
              
            </div>
          </div>
      	</div>
   
		)
}

export default Slider;


/*
    <AliceCarousel  autoPlay autoPlayInterval="2500" infinite disableDotsControls disableButtonsControls>
          {props.slider.map((item) => (
            <img onLoad={() =>{setloading(false)}} src={item.url} className="sliderimg" style={{width: "100%"}}/>
          ))}
        </AliceCarousel>

*/

//          {/* onLoadingComplete = {() => setLoad(true)} */}

//  {/* <LoadContext.Consumer>{ ({load, setLoad}) => */}
//     {/* }}</LoadContext.Consumer> */}
//style={loading ? {display: 'none'} : {}}

/*
import React from 'react';

import {BookingButton} from '../Booking';

import Slider from 'react-slick';
import Carousel from 'react-bootstrap/Carousel'

import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import {useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';

import DataContext, { withData } from '../App/context';

const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

const sliderStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '2',
    top: '0',
    opacity: '0.5',
    backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.53) 19.7%, rgba(0, 0, 0, 0) 55.28%)`
}

const MainSlider = (props) => {
  const [loading, setloading] = useState(true);
  return (
    <>
      <div className="lds-dual-ring" style={loading ? {} : {display: 'none'}}></div>
    	<div className={props.className + " slider"} style={loading ? {display: 'none'} : {}}>
        <AliceCarousel  autoPlay autoPlayInterval="2500" infinite disableDotsControls disableButtonsControls>
          {props.slider.map((item) => (
            <img onLoad={() =>{setloading(false)}} src={item.url} className="sliderimg" style={{width: "100%"}}/>
          ))}
        </AliceCarousel>

        <div style={sliderStyle} className="slider-overlay"></div>

        <div className="slider__info">
        	<h1>{props.data.sliderTitle}</h1>
        		<p>{props.data.sliderText}</p>
        		<BookingButton />
        </div>
    	</div>
    </>
  );

}

export default withData(withFirebase(MainSlider));


*/