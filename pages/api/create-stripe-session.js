const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

async function CreateStripeSession(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { item } = req.body;

  if (!item || !item.name || !item.price || !item.mode) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  const recurring = item.mode === 'subscription'
    ? { recurring: { interval: 'month', interval_count: 1 } }
    : {};

  const metadata = {
    description: item.paymentDesc || 'Default donation description',
    projectId: item.projectId || 'unknown',
  };

  const lineItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        description: item.description || 'Default product description',
        images: [
          'https://images.squarespace-cdn.com/content/v1/58a0e75d893fc0b6d3dbb39c/1487559614181-EE4ATC0KP41QQFYW2M3O/GHI+logo+-04.jpg',
        ],
      },
      unit_amount: item.price * 100,
      ...recurring,
    },
    quantity: 1,
  };

  const paymentMethods = item.mode === 'payment' ? ['card', 'us_bank_account'] : ['card'];

  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://givinghearts-nine.vercel.app';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethods,
      line_items: [lineItem],
      mode: item.mode,
      success_url: `${redirectURL}/success`,
      cancel_url: `${redirectURL}/cancel`,
      metadata,
    });

    res.status(200).json({ session });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default allowCors(CreateStripeSession);
