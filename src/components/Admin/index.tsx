//import { compose } from '@types/recompose';
import { withAuthorization, withEmailVerification, withAuthentication } from '../Session';


import {useState, useEffect} from 'react';


import Tabs from '../Tabs';

import { withFirebase } from '../Firebase';

import style from './style.module.css'

import SignOutButton from '../SignOut';
import AccountPage from '../Account';

//import firebase from '../../../pages/admin'



import Image from 'next/image'

import ImageUploader from '../Image'

const INITIAL_STATE = {
	email: "",
	phone1: "",
	phone2: "",
	addressUkr: "",
	addressPl: "",
	socialFacebook: "",
	socialTelegram: "",
	socialWhatsapp: "",
	socialInstagram: "",

}

const Admin = (props) => {
 
 

	const [state, setState] = useState(INITIAL_STATE);
  const [slider, setSlider] = useState([]);



/* onListenForStorage = () => {

    this.props.firebase.storage.ref(`slider`).listAll().then((res) => {
      res.items.forEach((itemRef) => {
        const slide = {};
        slide.ref = itemRef;
        itemRef.getDownloadURL().then((url) => {
          slide.url = url;
          let slider = this.state.slider;
          slider.push(slide);
          this.setState({slider: slider});
        });
      });
    }).catch((error) => {});
  }

*/
  


	useEffect(() => {



      props.firebase.storage.ref(`slider`).listAll().then((res) => {

        console.log('!')
setSlider([]);///////////////////////////////ЧОМУ ТАК ???????7
        

      res.items.forEach((itemRef) => {

         

        const slide = {};
        slide.ref = itemRef;
        itemRef.getDownloadURL().then((url) => {


          slide.url = url;
          let newSlider = slider;
          newSlider.push(slide);
 console.log(newSlider)

          setSlider(newSlider);
          console.log(slider)
        });
      });
    }).catch((error) => {
      console.log('Error');
      console.log(error);
    });


/*

  props.firebase.db.ref('data')
      .once('value', snapshot => {
        const dataObject = snapshot.val();
  

        setState({...dataObject})

      });

*/
     //onListenForStorage();

 
		 
      


	}, [])





const onChangeText = (event: any) => {
  	setState({ ...state, [event.target.name]: event.target.value });
  }


	const onChangeData = (e: any) => {
  	props.firebase.db.ref('data').set({
      ...state,
     // email: state.email,
    //  phone1: state.phone1,
    //  phone2: state.phone2,
     // addressUkr: state.addressUkr,
    //  addressPl: state.addressPl,
    //  facebook: state.socialFacebook,
    //  telegram: state.socialTelegram,
   //   whatsapp: state.socialWhatsapp,
   //   instagram: state.socialInstagram,
    //  gtmID: this.state.gtmID
     // gtmHead: this.state.gtmHead,
      //gtmBody: this.state.gtmBody
    });

    e.preventDefault();
    alert('Done');
  }








    const onListenForStorage = () => {
 

    props.firebase.storage.ref(`slider`).listAll().then((res) => {

        

      res.items.forEach((itemRef) => {

         

        const slide = {};
        slide.ref = itemRef;
        itemRef.getDownloadURL().then((url) => {


          slide.url = url;
          let newSlider = slider;
          newSlider.push(slide);
 console.log(newSlider)

          setSlider(newSlider);

           console.log(slider)
        });
      });
    }).catch((error) => {});
  }


 const onSlideUpload = () => { 
    setSlider([]);
    onListenForStorage();
  }


const onSlideDelete = (item) => {

    confirm("Want to delete?") ?
      item.ref.delete().then(() => {
        setSlider([]);
        onListenForStorage();
      }).catch((error) => {})
      
      : 

      null;
  }
 






	return (
		<div className="admin">
 
{console.log('SLIDER:')}
 { console.log(slider)}
			<Tabs>
  <div label="Контакти" className="admin__tab">
    <form className={style.adminForm} onSubmit={event =>onChangeData(event)} method="post" style={{display: "flex", flexDirection: "column"}} >
            <span>Email: </span><input type="text" name="email" placeholder="Email" value={state.email} onChange={onChangeText} />
            <span>Телефон 1: </span><input type="text" name="phone1" placeholder="Phone1" value={state.phone1} onChange={onChangeText} />
            <span>Телефон 2: </span><input type="text" name="phone2" placeholder="Phone2" value={state.phone2} onChange={onChangeText} />
            <span>Адреса Україна: </span><input type="text" name="addressUkr" placeholder="Address UA" value={state.addressUkr} onChange={onChangeText} />
            <span>Адреса Польща: </span><input type="text" name="addressPl" placeholder="Address PL" value={state.addressPl} onChange={onChangeText} />
            <br />
            <span>Facebook: </span><input type="text" name="socialFacebook" placeholder="Facebook" value={state.socialFacebook} onChange={onChangeText} />
            <span>Telegram: </span><input type="text" name="socialTelegram" placeholder="Telegram" value={state.socialTelegram} onChange={onChangeText} />
            <span>WhatsApp: </span><input type="text" name="socialWhatsapp" placeholder="Whatsapp" value={state.socialWhatsapp} onChange={onChangeText} />
            <span>Instagram: </span><input type="text" name="socialInstagram" placeholder="Instagram" value={state.socialInstagram} onChange={onChangeText} />


            <button className="btn btn-blue" type="submit">Надіслати</button>
         </form>
  </div>

  

 <div label="Слайдер" className="admin__tab">
      <h3>Слайди</h3>
          <div className="admin__slides">
            {slider && slider.map((item) => (
              <div className="admin__slide" key={item.url}>
                <Image src={item.url} width={150} height={100} />
                <div className="slide__delete" onClick={() => onSlideDelete(item)}>Delete</div>
              </div>
            ))}
          </div>
          <br />
          <h3>Додати слайд</h3>
          <ImageUploader folder="slider" onImageUpload={onSlideUpload} />
 
  </div>

 <div label="Аккаунт" className="admin__tab">
  <AccountPage />
     <SignOutButton />
  </div>

</Tabs>
      

		</div>
		)
}

const condition = (authUser: any) =>
  authUser && !!authUser.roles["ADMIN"];

/*
export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(Admin);
*/

 export default withFirebase(withAuthentication(withEmailVerification(withAuthorization(condition)(Admin))));
//export default withFirebase(Admin);