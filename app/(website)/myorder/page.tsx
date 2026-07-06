"use client";
import { useEffect, useMemo, useState } from 'react'

const myorder = () => {
    const [showorder, setShoworder] = useState([])
    console.log("showorder", showorder);

    const fetchOrder = async () => {

        const res = await fetch("/api/myorder")
        const data = await res.json()
        console.log(data);
        setShoworder(data)
    }
    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <>

            <table className="w-[100%]  mt-10 mb-10 border border-gray-300 shadow-lg">
                {showorder.data?.length === 0 ? (
                    <p>order not yet found</p>
                ) : (
                    <>
                        <thead className="bg-gray-800 text-white ">
                            <tr>
                                <th className="border px-4 py-3">No</th>
                                <th className="border px-4 py-3">Product Name</th>
                                <th className="border px-4 py-3">Price</th>
                                <th className="border px-4 py-3">Status</th>
                                <th className="border px-4 py-3">PaymentID</th>
                                <th className="border px-4 py-3">Total</th>
                            </tr >
                        </thead >
                        <tbody>
                            {showorder.data?.map((order: any, index) => {

                                const orderTotal = order.products.reduce((acc: any, item: number) => acc + item.price, 0);

                                return (
                                    <tr key={order._id} className="text-center hover:bg-gray-100">


                                        <td className="border px-4 py-3">{index + 1}</td>

                                        <td className="border px-4 py-3 p-0">
                                            {order.products.map((product: any, prodIndex: number) => (
                                                <div key={prodIndex} className="py-3 border-b last:border-b-0">
                                                    {product.id?.name}


                                                </div>
                                            ))}
                                        </td>

                                        <td className="border px-4 py-3 p-0">
                                            {order.products.map((product: any, prodIndex: number) => (
                                                <div key={prodIndex} className="py-3 border-b last:border-b-0">
                                                    ${product.price}
                                                </div>
                                            ))}



                                        </td>

                                        <td className="border px-4 py-3">{order.status}</td>
                                        <td className="border px-4 py-3">{order.paymentId}</td>
                                        <td className="border px-4 py-3">${orderTotal}</td>
                                    </tr>
                                );



                            })}
                        </tbody>
                    </>
                )}

            </table >

        </>
    )
}

export default myorder