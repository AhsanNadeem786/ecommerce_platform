"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
export default function Category() {
    const [showcategory, setShowcaterogy] = useState<any[]>([]);
    // const [deletecategory,setdeletecategory]= useState()
    const [editcategory, setEditcategory] = useState()
    // const params = useParams()
    const router = useRouter()
    const fetchCategroy = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setShowcaterogy(data.data);

    };
    useEffect(() => {
        fetchCategroy();
    }, []);

    const handleDelete = async (id: string) => {

        const deleteId = id;
        // || params._id
        try {
            const res = await fetch(`/api/categories/${deleteId}`, {
                method: "DELETE",
            })

            const data = await res.json()
            console.log(data);

            //    setdeletecategory(data)
            setShowcaterogy(prev => prev.filter((data) => data._id !== id))

        } catch (error) {
            console.log(error);

        }
    };

    const handleEdit = async (id: string) => {
        router.push(`/invantory/categories/${id}`)




    }
    return (
        <div className="min-h-screen p-6 -mt-158">
            <h1 className="text-center text-4xl font-bold mb-3">
                Caterogies
            </h1>
            <div className="flex justify-end">
                <Link href="/invantory/categories" className="bg-black text-white hover:bg-black/80 border border-gray-300 rounded-lg px-4 py-2 text-center mt-10">Create Caterogies</Link>
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
                                    <Image src={showcategory.images[0]} alt="" width={20} height={20} className="w-5 h-5 rounded-full" />
                                    {showcategory.title}
                                </td>

                                <td className="border px-4 py-3">
                                    {showcategory.description}
                                </td>

                                <td className="border px-4 py-3">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => handleDelete(showcategory._id)}
                                            // value={deletecategory}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => handleEdit(showcategory._id)}
                                            value={editcategory}
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


