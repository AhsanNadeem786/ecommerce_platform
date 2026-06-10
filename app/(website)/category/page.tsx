"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Category() {
    const [showcategory, setShowcaterogy] = useState([]);
    const fetchCategroy = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setShowcaterogy(data.data);

    };
    useEffect(() => {
        fetchCategroy();
    }, []);
    const handleDelete = (id: string) => {
        console.log("Delete", id); 
    };
    function handleEdit(product: any): void {
        console.log("Edit", product);
    }

    return (
        <div className="min-h-screen p-6 -mt-150">
            <h1 className="text-center text-4xl font-bold mb-3">
                Caterogies
            </h1>
            <div className="flex justify-end">
                <Link href="/categories" className="bg-black text-white hover:bg-black/80 border border-gray-300 rounded-lg px-4 py-2 text-center mt-10">Create Caterogies</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-275 ml-50  border border-gray-300 shadow-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="border px-4 py-3">Caterogies Name</th>
                            <th className="border px-4 py-3">Description</th>
                            <th className="border px-4 py-3">Actions</th>
                          
                        </tr>
                    </thead>

                    <tbody>
                        {showcategory.map((showcategory: any) => (
                            <tr
                                key={showcategory._id}
                                className="text-center hover:bg-gray-100"
                            >
                                <td className="border px-4 py-3">
                                    {showcategory.title}
                                </td>

                                <td className="border px-4 py-3">
                                    {showcategory.description}
                                </td>

                                <td className="border px-4 py-3">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => handleDelete(showcategory._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => handleEdit(showcategory)}
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


