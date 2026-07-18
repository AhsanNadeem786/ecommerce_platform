"use client";

import { useEffect, useState } from "react";

interface Product {
  id: {
    name: string;
  };
  price: number;
}

interface Order {
  _id: string;
  status: string;
  paymentId: string;
  products: Product[];
}

interface OrderResponse {
  data: Order[];
}

const MyOrder = () => {
  const [showorder, setShoworder] = useState<OrderResponse>({
    data: [],
  });

  const fetchOrder = async () => {
    try {
      const res = await fetch("/api/myorder");
      const data = await res.json();

      setShoworder(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <table className="w-full mt-10 mb-10 border border-gray-300 shadow-lg">
        {showorder.data.length === 0 ? (
          <tbody>
            <tr>
              <td
                colSpan={6}
                className="text-center py-6 text-gray-500 font-semibold"
              >
                Order not found yet.
              </td>
            </tr>
          </tbody>
        ) : (
          <>
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border px-4 py-3">No</th>
                <th className="border px-4 py-3">Product Name</th>
                <th className="border px-4 py-3">Price</th>
                <th className="border px-4 py-3">Status</th>
                <th className="border px-4 py-3">Payment ID</th>
                <th className="border px-4 py-3">Total</th>
              </tr>
            </thead>

            <tbody>
              {showorder.data.map((order, index) => {
                const orderTotal = order.products.reduce(
                  (acc, item) => acc + item.price,
                  0
                );

                return (
                  <tr
                    key={order._id}
                    className="text-center hover:bg-gray-100"
                  >
                    <td className="border px-4 py-3">{index + 1}</td>

                    <td className="border px-4 py-3 p-0">
                      {order.products.map((product, prodIndex) => (
                        <div
                          key={prodIndex}
                          className="py-3 border-b last:border-b-0"
                        >
                          {product.id?.name}
                        </div>
                      ))}
                    </td>

                    <td className="border px-4 py-3 p-0">
                      {order.products.map((product, prodIndex) => (
                        <div
                          key={prodIndex}
                          className="py-3 border-b last:border-b-0"
                        >
                          ${product.price}
                        </div>
                      ))}
                    </td>

                    <td className="border px-4 py-3">
                      {order.status}
                    </td>

                    <td className="border px-4 py-3">
                      {order.paymentId}
                    </td>

                    <td className="border px-4 py-3">
                      ${orderTotal}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        )}
      </table>
    </>
  );
};

export default MyOrder;