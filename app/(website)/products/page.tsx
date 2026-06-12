"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    
    const router = useRouter()
    const fetchProducts = async () => {
        const res = await fetch("/api/create-product");
        const data = await res.json();
        setProducts(data.data);

    };
    useEffect(() => {
        fetchProducts();
    }, []);
     const handleDelete = async (id: string) => {
       
        const deleteId = id;
        // || params._id
        try {
            const res = await fetch(`/api/create-product/${deleteId}`, {
                method: "DELETE",
            })

            const data = await res.json()
            console.log(data);

            //    setdeletecategory(data)
            setProducts(prev => prev.filter((data) => data._id !== id))

        } catch (error) {
            console.log(error);

        }
    };
     const handleEdit = async (id: string) => {
        router.push(`/products/${id}`)
}
    return (
        <div className="min-h-screen p-6 -mt-150">
            <h1 className="text-center text-4xl font-bold mb-3">
                Products
            </h1>
            <div className="flex justify-end">
                <Link href="/createProduct" className="bg-black text-white hover:bg-black/80 border border-gray-300 rounded-lg px-4 py-2 text-center mt-10">Create Product</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-275 ml-50  border border-gray-300 shadow-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="border px-4 py-3">Name</th>
                            <th className="border px-4 py-3">Price</th>
                            <th className="border px-4 py-3">Quantity</th>
                            <th className="border px-4 py-3">Category</th>
                            <th className="border px-4 py-3">Description</th>
                            <th className="border px-4 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product: any) => (
                            <tr
                                key={product._id}
                                className="text-center hover:bg-gray-100"
                            >
                                <td className="border px-4 py-3">
                                    {product.name}
                                </td>

                                <td className="border px-4 py-3">
                                    ${product.price}
                                </td>

                                <td className="border px-4 py-3">
                                    {product.quantity}
                                </td>

                                <td className="border px-4 py-3">
                                    {product.categoryId.title}
                                </td>

                                <td className="border px-4 py-3">
                                    {product.description}
                                </td>

                                <td className="border px-4 py-3">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => handleEdit(product._id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


