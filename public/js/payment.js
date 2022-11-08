const stripe = Stripe('pk_test_51M1ZMWSFcPIIMx3ruBJZdOe2pWMzov2imllBIxXpWFQJAurcBVHenF9FTFcs08WaZMk03wTnEwLSymGX4wYdIyQP008JyJVmsD');

async function makePayment(plan) {
  fetch('/test', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      product: {
        plan,
      },
    }),
  });

  console.log(plan);
  let response = await fetch('/wallet/addMoney/stripe', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      product: {
        plan,
      },
    }),
  });

  response = await response.json();
  response = await stripe.redirectToCheckout({ sessionId: response.id });
  if (response.error) {
    console.log(response.error.message);
  }
}
