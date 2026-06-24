"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateCategories() {
    const path = usePathname()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
  
    const id = path.split("/")[2]



    const handleUpdateCategory = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method:"PUT",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: JSON.stringify({ title,description }),
            });


            const data = await res.json()



        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    };
    const fetchCategroy = async () => {
        const res = await fetch(`/api/categories/${id}`);
        const data = await res.json();
  
        setTitle(data.data.title)
        setDescription(data.data.description)

    };
    useEffect(() => {
        fetchCategroy();
    }, []);

    return (
        <div className="container -mt-150 flex justify-center">
            <form onSubmit={handleUpdateCategory} className="w-125 h-96 bg-white shadow-lg rounded-lg flex mt-20 justify-start items-start flex-col">
                <h1 className="text-2xl font-bold mb-4 ml-35">Categories</h1>

                <input type="text" placeholder="title" className="h-10 w-64 border border-gray-300 rounded-lg px-4 py-2 ml-30 mt-5" value={title} onChange={(e) => setTitle(e.target.value)} />

                <input type="text" placeholder="description" className="h-10 w-64 border border-gray-300 rounded-lg px-4 py-2 ml-30 mt-5" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" className="h-10 w-64 bg-blue-500 text-white rounded-lg px-4 py-2 ml-30 mt-5 hover:bg-blue-600" disabled={loading}>
                    {loading ? "Updating..." : "UpdateCategroy"}
                </button>
            </form>
        </div>
    );
}