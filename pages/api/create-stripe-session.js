const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { item } = req.body;

  if (!item || !item.name || !item.price || !item.mode) {
    return res.status(400).json({ error: 'Некорректные данные запроса' });
  }

  const subscriptionData = item.mode === 'subscription'
    ? {
        subscription_data: {
          description: item.description || 'Подписка на пожертвование',
        },
      }
    : {};

  const lineItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        description: item.description || 'Пожертвование',
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [lineItem],
      mode: item.mode,
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
      ...subscriptionData,
    });

    res.status(200).json({ session });
  } catch (error) {
    console.error('Ошибка создания Stripe-сессии:', error.message);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}
