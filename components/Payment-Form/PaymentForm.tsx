import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  FormContainer,
  PaymentFormContainer,
  // PaymentButton,
} from "./payment-form.styles";
// import Button, { BUTTON_TYPE_CLASSES } from "../Button/Button";
import { FormEvent, useState } from "react";
import { useAppSelector } from "../../src/Utils/Redux/hooks/hooks";
import { Button } from "@mantine/core";

const PaymentForm = () => {
  const { cartTotal } = useAppSelector((state) => state.cart);
  const { currentUser } = useAppSelector((state) => state.user);
  const [isPaymentProccessing, setIsPaymentProccessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const paymentHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsPaymentProccessing(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setIsPaymentProccessing(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <>
      <CardElement />
    </>
    // <PaymentFormContainer>
    //   <FormContainer onSubmit={paymentHandler}>
    //     <h2>Credit Card Payment: </h2>
    //     <CardElement />
    //     <Button
    //     // isLoading={isPaymentProccessing}
    //     // buttonType={BUTTON_TYPE_CLASSES.inverted}
    //     >
    //       Pay Now
    //     </Button>
    //   </FormContainer>
    // </PaymentFormContainer>
  );
};

export default PaymentForm;
