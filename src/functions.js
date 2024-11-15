
import { useContext } from 'react'
import { DataContext } from '../../../pages/_app'


export const sendMail = (data, subject) => {


	const contextData = useContext(DataContext)

	const time = new Date().toLocaleString();
	const address = contextData?.email; //'danik77p@gmail.com'
	const mail = {...data, subject, time, address};
	const mailServer = 	`https://yanmall.leopolis.org.ua/mail-fastcargo.php`



console.log(mail)

	fetch(mailServer, {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(mail) //'name=danik'
		}).then((response) => { console.log(response); response.text()})
		  .then((text) => {
		  	console.log("suc")
		  	console.log(text)

		  })
		  .catch((error) => {
		  		console.log("err")
		  	console.log(error)
			});




}