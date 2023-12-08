import React, { useEffect, useRef } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useSelector,useDispatch } from "react-redux";
import { addOrder } from "../features/order/orderSlice";
import { resetStateCart } from "../features/cart/cartSlice";

const StripePaymentForm = ({amount}) => {
  const stripeRef = useRef(null);
  const currentUser = useSelector((state)=>state.auth.user)
  console.log(currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const stripeButton = document.querySelector(".stripe-checkout-button");
      stripeButton.style.display = "none";
      stripeRef.current.click();
    }, 300000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const onToken = (token) => {
    console.log(token);
    dispatch(addOrder(amount))
    dispatch(resetStateCart())


    // Here you can send the token to your backend to complete the payment process
  };

  return (
    <>
    
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_51MyR6bEwhrtauCNk4Wnvls8pwtozplGPNUA1jLKYdDuA9Xgr9C9YbODiBDXPMd13sTsbjSEzBMGCIzxfm07vupZB00H8HKrg22"
          amount={amount} // The amount you want to charge in cents
          name={currentUser.firstname}
          description="paying details"
          image="https://your-image-url.com/logo.png" // Optional
          nodeRef={stripeRef}
        >
        <button className="button">Pay with Card</button>
  </StripeCheckout>
      
    
    </>
  );
};

export default StripePaymentForm;
