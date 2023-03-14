import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import {
//   FormContainer,
//   PaymentFormContainer,
//   // PaymentButton,
// } from "./payment-form.styles";

import { FormEvent, useState } from "react";

import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";

import { useCart } from "../../utils/useCartContext";

const PaymentForm = () => {
  const { cartTotal } = useCart();
  const { data: currentUser } = useSession();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const paymentHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsPaymentProcessing(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { clientSecret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement)!,
        billing_details: {
          name: currentUser ? "Name" : "Guest",
        },
      },
    });

    setIsPaymentProcessing(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else if (paymentResult.paymentIntent.status === "succeeded") {
      alert("Payment Successful");
    }
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <form>
        <h2>Credit Card Payment: </h2>
        <CardElement />
      </form>
      <Button loading={isPaymentProcessing} color="dark" variant="outline">
        Pay Now
      </Button>
    </div>
    // <PaymentFormContainer>
    //   <FormContainer onSubmit={paymentHandler}>
    //     <CardElement />
    //   </FormContainer>
    // </PaymentFormContainer>
  );
};

export default PaymentForm;
