import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PUVcDH0zZ3WwQ3i3ehevjkpuPlTUMlrFjZGrHi0eTbXUkxybeZMV1azJN0fcjIz3yr8oKkz3omroImkFxWrsmix006ZmPMoJd"
);

const PaymentForm = ({ address }) => {
  const [amount, setAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // Step 1: Create payment intent
      const paymentIntentResponse = await axios.post(
        "https://dish-dash.onrender.com/create-payment-intent",
        {
          amount: amount * 100,
        }
      );
      const clientSecret = paymentIntentResponse.data.clientSecret;

      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {},
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        // Step 3: If payment is successful, create order
        if (result.paymentIntent.status === "succeeded") {
          try {
            const orderResponse = await axios.post(
              "https://dish-dash.onrender.com/api/orders/create",
              {
                user: user._id,
                items: items,
                totalAmount: totalAmount,
                totalQuantity: totalQuantity,
                address: address,
              }
            );
            console.log(orderResponse);
            if (orderResponse.status === 200) {
              navigate("/order/success");
            } else {
              console.log("Failed to create order");
            }
          } catch (error) {
            console.error("Error creating order:", error.message);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const inputStyle = {
    style: {
      base: {
        color: "#F5F5F5",
        backgroundColor: "#222222",
        iconColor: "#F5F5F5",
        "::placeholder": {
          color: "#A3A3A3",
        },
      },
      invalid: {
        color: "#EF4444",
      },
    },
  };

  return (
    <div className="flex justify-center items-center p-12 bg-[#222222] text-[#F5F5F5] font-['customSans'] rounded-md">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-y-4"
      >
        <div className="mb-4">
          <label className="block">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#E5E7EB] text-[#222222] shadow-sm focus:border-[#1D4ED8] focus:ring focus:ring-[#93C5FD] focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">Card Number:</label>
          <CardNumberElement
            options={inputStyle}
            className="mt-1 block w-full rounded-md border-[#9CA3AF] shadow-sm focus:border-[#1D4ED8] focus:ring focus:ring-[#93C5FD] focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block">Expiration Date:</label>
          <CardExpiryElement
            options={inputStyle}
            className="mt-1 block w-full rounded-md border-[#9CA3AF] shadow-sm focus:border-[#1D4ED8] focus:ring focus:ring-[#93C5FD] focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block">CVC:</label>
          <CardCvcElement
            options={inputStyle}
            className="mt-1 block w-full rounded-md border-[#9CA3AF] shadow-sm focus:border-[#1D4ED8] focus:ring focus:ring-[#93C5FD] focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-[#10B981] text-white p-2 rounded-md hover:bg-[#EF4444] transition-colors duration-200"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

const StripeWrapper = ({ address }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...address} />
  </Elements>
);

export default StripeWrapper;
