require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET); // Add your Secret Key Here

module.exports = {
  makePayment: async (plan, host) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `$${plan} plan`,
            },
            unit_amount: Number(plan) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://${host}/wallet/addMoney/stripe/payment`,
      cancel_url: `https://${host}/wallet/addMoney?message=cancel`,
    });

    return { session, price: plan };
  },
};
