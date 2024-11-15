import { useState } from 'react';

import {  useTranslation } from 'next-i18next';


import { useRouter } from "next/router";
 

import Link from 'next/link'

import style from './style.module.scss';



const LangSwitch = () => {

const { i18n, t } = useTranslation();
const router = useRouter();

const [active, setActive] = useState(router.locale);


const handleClick = (lang: string) => {
	setActive(lang)
}


///// ДОДАВАТИ стиль в конкретий ітем 

	return (
		<>

		<div className={style.lang__switch}>
          <Link
            href={`/uk${router.pathname}`}
            locale={'uk'}
          >
              <a className={`${style.lang__item} ${active === 'uk' && style.lang__active}`} onClick={() => handleClick('uk')}>{t('UA')}</a>
          </Link>
 					<Link
            href={`/ru${router.pathname}`}
            locale={'ru'}
          >
              <a className={`${style.lang__item} ${active === 'ru' && style.lang__active}`} onClick={() => handleClick('ru')}>{t('RU')}</a>
          </Link>
        </div>

		</>
	);
}

export default LangSwitch