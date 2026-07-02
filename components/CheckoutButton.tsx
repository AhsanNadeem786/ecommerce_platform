'use client';

import React, { useState } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';

interface CheckoutButtonProps {
  price: number;
}

export default function CheckoutButton({}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { url } = await createCheckoutSession();
      if (url) {
        window.location.href = url; 
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
      disabled={loading}
      className="px-6 py-3 ml-5 mb-3 w-50 h-15 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  );
}