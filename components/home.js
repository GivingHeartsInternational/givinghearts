import Head from 'next/head';
import Image from 'next/image';
//import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const { status } = router.query;

    const [donateButtonText, setDonateButtonText] = useState('Donate')
    const [loading, setLoading] = useState(false);
    const [customPrice, setCustomPrice] = useState(false)
    const [startPrice, setStartPrice] = useState(50)
    const [paymentDesc, setPaymentDesc] = useState('')

    const [item, setItem] = useState({
        name: 'Donation for Giving Hearts',
        description: 'Donation for Giving Hearts',
        image: "/images/ghlogo.png",
        price: startPrice,
        mode: "payment",
        paymentDesc: ""
    });

    const changePrice = (e) => {

        if (e.target.value === "custom") {
            setItem({ ...item, price: Math.max(0, startPrice) });
            setCustomPrice(true)
        } else {
            // Don't allow the quantity less than 0, if the quantity is greater than value entered by user then the user entered quantity is used, else 0
            setItem({ ...item, price: Math.max(0, e.target.value) });
            setCustomPrice(false)
        }
    };

    const changeCustomPrice = (value) => {
        // Don't allow the quantity less than 0, if the quantity is greater than value entered by user then the user entered quantity is used, else 0
        setItem({ ...item, price: Math.max(0, value) });
    };

    const changeMode = (e) => {
        setItem({ ...item, mode: e.target.value });
        // setStripeType(e.target.value)
        //  console.log(e.target.value)
    }

    const onInputChange = (e) => {
        console.log(e.target.value)
        if (!e.target.value || e.target.value == "0") {
            changeCustomPrice(1);
        } else {
            changeCustomPrice(parseInt(e.target.value));
        }
        //  console.log(customPrice)

    };

    const changePaymentDesc = (e) => {
        //  console.log(customPrice)
        setItem({ ...item, paymentDesc: e.target.value });
    };


    useEffect(() => {
        setDonateButtonText("Donate $" + item.price + (item.mode === "subscription" ? "/month" : ""))

        return () => {
            // setItem({ ...item, mode: "payment", price: startPrice });
        }
    })




    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe(publishableKey);
    // const stripePromise = loadStripe('pk_test_qYmzeeiLuWz5xPx4xLHJrUpI');
    const createCheckOutSession = async () => {
        setLoading(true);
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/create-stripe-session', {
            item: item,
        });
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });
        if (result.error) {
            console.log(result.error.message);
        }
        setLoading(false);
    };
    return (
        <div>
      <main>
        {status && status === 'success' && (
          <div className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
            Payment Successful
          </div>
        )}
        {status && status === 'cancel' && (
          <div className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
            Payment Unsuccessful
          </div>
        )}
        <div className='shadow-lg border rounded p-2 '> 
 

  <div className = "stripe" >
        <div className="stripe__data">
          <h3>Choose Your Donation</h3>
                    <div className="stripe__type">
            {/* <div onClick={changeType}>One time</div>
          <div onClick={changeType}>Ongoing</div>*/}
            <div>
              <input
                type="radio"
                id="stripeModePayment"
                name="stripeMode"
                value="payment"
                defaultChecked
                onChange={changeMode}
                checked={(item.mode == "payment")}
              />
              <label htmlFor="stripeModePayment">One time</label>
            </div>
            <div>
              <input
                type="radio"
                id="stripeModeSubscription"
                name="stripeMode"
                value="subscription"
                onChange={changeMode}
                checked={(item.mode == "subscription")}
              />
              <label htmlFor="stripeModeSubscription">Ongoing</label>
            </div>
          </div>



          <p className='text-sm text-gray-600 mt-1'>Price:</p>
          <div className='border rounded'>
          <div className="stripe__amount">
            {/* <div onClick={changeAmount}>50</div>
          <div onClick={changeAmount}>200</div>*/}
            <div>
              <input
                type="radio"
                id="stripePrice50"
                name="stripePrice"
                value="50"
                defaultChecked
                onChange={changePrice}
                checked={(item.price == 50 && !customPrice)}
              />
              <label htmlFor="stripePrice50">$50</label>
            </div>
            <div>
              <input
                type="radio"
                id="stripePrice200"
                name="stripePrice"
                value="200"
                onChange={changePrice}
                checked={(item.price == 200 && !customPrice)}
              />
              <label htmlFor="stripePrice200">$200</label>
            </div>
            <div>
              <input
                type="radio"
                id="stripePrice500"
                name="stripePrice"
                value="500"
                onChange={changePrice}
                                checked={(item.price == 500 && !customPrice)}
              />
              <label htmlFor="stripePrice500">$500</label>
            </div>
            
          </div>

           <div className="custom-price">
           <div className="custom-price-button">
              <input
                type="radio"
                id="stripePriceCustom"
                name="stripePrice"
                value="custom"
                onChange={changePrice}

              />
              <label htmlFor="stripePriceCustom">Custom</label>
              </div>

              <div className={`custom-price-input ${customPrice ? "active" : "closed" }`}>
            <input
              disabled={!customPrice}
              type='number'
              onChange={onInputChange}
             value={customPrice ? item.price : startPrice}
            />
            </div>

            </div>

          {/*

<div className="payment-description">
 <h3>Add text:</h3>
        <div  >
            <input
              type='text'
              onChange={changePaymentDesc}
             value={item.paymentDesc}
            />
            </div>
</div>
*/}
       

          </div>
 <div className="stripe__pay">
          <button
            disabled={item.price === 0 || loading}
            onClick={createCheckOutSession}
            className='uk-button button-yellow uk-button-large uk-button-bold'
          >
            {loading ? 'Processing...' : donateButtonText}
          </button>
          </div> 

          </div>
{/*
          <div className="stripe__pay">
          <a href={`https://buy.stripe.com/${stripeLink}`} target="blank">
            <button className="uk-button button-yellow uk-button-large uk-button-bold">
              {`Donate $${stripeAmount}`}
              {stripeType == "rec" && "/month"}
            </button>
          </a>{" "}
        </div> { " " }
*/}

          </div>
        </div>
 
 
      </main>
    </div>
    );
}