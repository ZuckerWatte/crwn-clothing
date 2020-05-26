import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_kZPP0QyPQ7wUMqGEN3DKpUIr00KbEV7kfg";

  const onToken = (token) => {
    console.log(token);
    alert("PaymentSuccessful!");
  };

  return (
    <StripeCheckout
      label="Pay Now!"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg s"
      description={`Your total price is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
