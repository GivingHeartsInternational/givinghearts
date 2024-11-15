const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}




async function SaveStripeSession(req, res) {


    //const { session_id } = req.body.session_id;

    /*

        const item = {
            name: 'Donation',
            description: 'Donation',
            price: 50,
            mode: "payment"
        };
    */



    const redirectURL =
        process.env.NODE_ENV === 'development' ?
        'http://localhost:3000' :
        'https://giv-front.herokuapp.com';

  //  const session = await stripe.checkout.sessions.retrieve("cs_test_a1P1R3FKQjUQfxeAYVfp8hdfQ4V9bgq27fusYg4a7AJyRPwqUskN2yL3p6");

    const db_item = {

    }

 const request = `https://api.webflow.com/collections/624f1de46ce3122756ce03d8/items?api_version=1.0.0&access_token=441b50f70f0ee0dbf5d486085126791405b74f69e93380ca61e65a54d49400ce`;


 /*const items = await axios.get(request, {}, {
    headers: {
    'Content-Type': 'application/json'
    }})
    */
     /* .then((res) => {

        const items = res.items.filter(item => item["blog-post-category"] === "624f1de46ce312e62ace047a")
      setProjectList(items)
      //  setProjectList(res.data.data)
      });
      */

    //console.log(session)


    res.json({ });
    //res.json({ name: "danik" });
}

export default allowCors(SaveStripeSession);