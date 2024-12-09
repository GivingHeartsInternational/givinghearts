const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);


const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader("Access-Control-Allow-Origin", "*")
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  )
  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

async function CreateStripeSession(req, res) {
  const { item } = req.body

  /*

        const item = {
            name: 'Donation',
            description: 'Donation',
            price: 50,
            mode: "payment"
        };
    */

  const reccuring = {
    recurring: {
      interval: "month",
      interval_count: 1,
    },
  }

  const paymentDesc = {
    payment_intent_data: {
      description: item.paymentDesc,
      metadata: {
        paymentDesc: item.paymentDesc,
        projectId: item.projectId,
      },
    },
  }

  const subscriptionDesc = {
    subscription_data: {
      description: item.paymentDesc,
      metadata: {
        paymentDesc: item.paymentDesc,
        projectId: item.projectId,
      },
    },
  }


  const reccuringObject = item.mode == "subscription" ? reccuring : {}
  const paymentMethodDescObject = item.mode == "payment" ? paymentDesc : subscriptionDesc

  const paymentMethods = ["card"]

  if (item.mode === "payment") {
    paymentMethods.push("us_bank_account")
  }

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://giv-front.herokuapp.com"

  const transformedItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        description: item.description,
        images: [
          "https://images.squarespace-cdn.com/content/v1/58a0e75d893fc0b6d3dbb39c/1487559614181-EE4ATC0KP41QQFYW2M3O/GHI+logo+-04.jpg",
        ],
      },
      unit_amount: item.price * 100,
      ...reccuringObject,
    },
    description: item.description,
    quantity: 1,
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: paymentMethods,
    line_items: [transformedItem],
    mode: item.mode,
    success_url: "https://giving-hearts.webflow.io/donate",
    cancel_url: "https://giving-hearts.webflow.io/donate",
    metadata: {
      paymentDesc: item.paymentDesc,
      projectId: item.projectId,
    },
    ...paymentMethodDescObject,
  })

  //console.log(session)

  res.json({ session: session })
  //res.json({ name: "danik" });
}

export default allowCors(CreateStripeSession)
