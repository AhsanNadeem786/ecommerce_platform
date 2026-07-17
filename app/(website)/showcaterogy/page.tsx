"use client"

import { useRouter } from 'next/navigation';
import  { useEffect, useState } from 'react'

const showcaterogy = () => {
    const [caterogy, showCaterogy] = useState<any[]>([]);
     const router = useRouter()
    const fetchCategroy = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();


        showCaterogy(data.data);

    };
    useEffect(() => {
        fetchCategroy();
    }, []);
     const handleCategoryRedirect = (id: any) => {
        router.push(`/category/${id}`)
    }
    return (
         <div className="bg-white shadow-olive-200  max-w-6xl mx-auto px-4 mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {caterogy.map((cat: any) => {
                    return (
                        <div
                            onClick={() => handleCategoryRedirect(cat._id)}
                            key={cat._id}
                            className="flex flex-col items-center gap-4 shadow-lg p-4 cursor-pointer"
                        >
                            <img
                                src={cat.images}
                                alt={cat.title}
                                className="h-20 w-20 rounded-full object-cover"
                            />
                            <p className="font-bold text-center text-[16px] md:text-[20px]">
                                {cat.title}
                            </p>
                        </div>
                    );
                })}
            </div>
    )
}

export default showcaterogy