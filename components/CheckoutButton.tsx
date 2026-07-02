'use client';

import React, { useState } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';

interface CheckoutButtonProps {
  disabled: boolean
}

export default function CheckoutButton({ disabled }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [adress, setAdress] = useState()
  console.log("disabled", disabled);

  const handleCheckout = async () => {
    if (disabled) {

      alert("please add address before clicking on buy now")
      return
    }
    setLoading(true);
    try {
      const { url, error } = await createCheckoutSession();
      // console.log("addressed",addressed);
      // setAdress(addressed)
      if (url) {
        window.location.href = url;
      } else if (error) {
        alert(error)
      } else {
        alert("something went wrong")
      }
    } catch (err) {
      alert('An error occurred during checkout initialization.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      // disabled={loading|| disabled}
      style={{ opacity: disabled ? .40 : 1 }}
      className={`px-6 py-3 ml-5 mb-3 w-50 h-15 bg-blue-600   text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400`}
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  );
}
