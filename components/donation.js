import React, { useState, useEffect } from "react"

import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { useRouter } from "next/router"


import Home from './home';






/*
async function CreateStripeSession(req, res) {
    const { item } = req.body

    const redirectURL =
        process.env.NODE_ENV === "development" ?
        "http://localhost:3000" :
        "https://stripe-checkout-next-js-demo.vercel.app"

    const transformedItem = {
        price_data: {
            currency: "usd",
 
            unit_amount: 20,
        },
        // description: item.description,
        //  quantity: item.quantity,
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [transformedItem],
        mode: "payment",
        success_url: redirectURL + "?status=success",
        cancel_url: redirectURL + "?status=cancel",
        metadata: {
            images: item.image,
        },
    })

    res.json({ id: session.id })
}
*/

const links = {
    stripe50one: "dR629U6j59HhgrC9AC",
    stripe200one: "4gwg0K22Pg5Fb7i5ko",
    stripe500one: "dR63dYcHtdXxb7i5kr",
    stripe50rec: "14kg0K6j5bPpeju6or",
    stripe200rec: "00g8yifTF6v58Za8wB",
    stripe500rec: "fZeeWG8rd4mXeju14a",
}

const Donation = () => {
    const [stripeLink, setStripeLink] = useState(links.stripe50one)

    const [stripeAmount, setStripeAmount] = useState(50)
    const [stripeType, setStripeType] = useState("one")

    const changeType = (e) => {
        setStripeType(e.target.value)
        //	console.log(e.target.value)
    }

    const changeAmount = (e) => {
        setStripeAmount(e.target.value)
        //	console.log(e.target.value)
    }

    useEffect(() => {
        setStripeLink(links[`stripe${stripeAmount}${stripeType}`])
    }, [stripeAmount, stripeType])

    return ( <
        >

      

        <
        div className = "stripe" >
        <div className="stripe__data">
					<h3>Choose Your Donation</h3>
					<div className="stripe__type">
						{/* <div onClick={changeType}>One time</div>
					<div onClick={changeType}>Ongoing</div>*/}
						<div>
							<input
								type="radio"
								id="stripeTypeOne"
								name="stripeType"
								value="one"
								defaultChecked
								onChange={changeType}
							/>
							<label htmlFor="stripeTypeOne">One time</label>
						</div>
						<div>
							<input
								type="radio"
								id="stripeTypeRec"
								name="stripeType"
								value="rec"
								onChange={changeType}
							/>
							<label htmlFor="stripeTypeRec">Ongoing</label>
						</div>
					</div>
					<div className="stripe__amount">
						{/* <div onClick={changeAmount}>50</div>
					<div onClick={changeAmount}>200</div>*/}
						<div>
							<input
								type="radio"
								id="stripeAmount50"
								name="stripeAmount"
								value="50"
								defaultChecked
								onChange={changeAmount}
							/>
							<label htmlFor="stripeAmount50">$50</label>
						</div>
						<div>
							<input
								type="radio"
								id="stripeAmount200"
								name="stripeAmount"
								value="200"
								onChange={changeAmount}
							/>
							<label htmlFor="stripeAmount200">$200</label>
						</div>
						<div>
							<input
								type="radio"
								id="stripeAmount500"
								name="stripeAmount"
								value="500"
								onChange={changeAmount}
							/>
							<label htmlFor="stripeAmount500">$500</label>
						</div>
					</div>
				</div> { " " }
        <div className="stripe__pay">
					<a href={`https://buy.stripe.com/${stripeLink}`} target="blank">
						<button className="uk-button button-yellow uk-button-large uk-button-bold">
							{`Donate $${stripeAmount}`}
							{stripeType == "rec" && "/month"}
						</button>
					</a>{" "}
				</div> { " " } <
        /div> { " " } < / >
    )
}

export default Donation
































const item = {
    name: "Apple AirPods",
    description: "Latest Apple AirPods.",
    quantity: 1,
    price: 999,
}

export const Stripe2 = () => {
    const publishableKey = "pk_live_yRFNswNUWVgmDbaW9ATjCSbp"
    const stripePromise = loadStripe(publishableKey)

    //console.log(stripe.checkout.sessions)

    const createCheckOutSession = async () => {
        const stripe = await stripePromise




        const checkoutSession = await axios.post(
            "/api/create-stripe-session", {
                item: item,
            }, { headers: { 'Content-Type': 'application/json' } }
        ).then(response => (console.log(response)));

        console.log(checkoutSession.data.id)

        /*

        const redirectURL = "http://localhost:3000" ////////////!!!!!!!!!!!!!!!
        //// process.env.NODE_ENV === "development"
        //  ? "http://localhost:3000"
        //  : "https://stripe-checkout-next-js-demo.vercel.app"

        const transformedItem = {
            price_data: {
                currency: "usd",

                unit_amount: 20,
            },
            // description: item.description,
            quantity: 1,
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [transformedItem],
            mode: "payment",
            success_url: redirectURL + "?status=success",
            cancel_url: redirectURL + "?status=cancel",
            metadata: {
              
            },
        })
*/

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
            //sessionId: session.id,
        })
        if (result.error) {
            console.log(result.error.message)
        }
    }

    return ( <
        >
        <button onClick={createCheckOutSession}>Donate</button> { " " } <
        />
    )
}