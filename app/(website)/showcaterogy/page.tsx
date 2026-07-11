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
        <div className=" h-full mb-30 max-w-900  mt-15 w-full grid grid-cols-4 gap-13">
            {
                caterogy.slice(0, 6).map((caterogy: any) => {
                    return (
                        <div onClick={() => handleCategoryRedirect(caterogy._id)} key={caterogy._id} className="flex flex-col gap-10  h-full bg-white shadow-lg    ">
                            <img src={caterogy.images} alt="" className="h-50 w-65 rounded- full ml-5 mt-5 " />
                            <p className="font-bold  text-center text-[20px] mb-5">{caterogy.title}</p>
                        </div>
                    )
                })
            }



        </div>
    )
}

export default showcaterogy