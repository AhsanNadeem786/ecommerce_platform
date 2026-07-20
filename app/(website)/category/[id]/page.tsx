
import AddToCart from "@/components/AddToCart";
import { Button } from "@/components/ui/button";
import Category from "@/models/Category";
import productsModel from "@/models/createproduct";
import Link from "next/link";

import React from 'react'

const CategoryProducts = async ({
    params
}: { params: any }) => {
  
    const { id } = await params;
    const products = await productsModel.find({ categoryId: id }).lean();
    const caterogyData = await Category.findOne({ _id: id }, "title").lean()


    
    return (
        <>
            <h1 className="bg-black text-white h-10 text-center mt-5 ">{caterogyData.title}</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 p-4">
                           {products.map((product: any) => {
                               return (
                                   <div
                                       
                                       key={product._id}
                                       className="flex justify-center cursor-pointer"
                                   >
                                       <div className="bg-[#f8f9fc] w-full max-w-xs rounded-3xl p-5 border border-[#00000017] shadow-xl flex flex-col gap-5 items-center justify-between">
           
                                           <img src={product.images[0]} alt={product.name} className="h-60 w-60 object-contain" />
           
                                           <p className="text-center font-bold text-[15px]">{product.name}</p>
                                           <p className="text-center text-[14px] text-[#76767f] font-bold">{product.categoryId.title}</p>
                                           <p className="text-2xl font-semibold">${product.price}</p>
                                           <div className="flex justify-center items-center gap-4 w-full">
                                               <Button className="bg-black text-white p-3 rounded-2xl w-full max-w-[120px]">
                                                   Quick buy
                                               </Button>
                                               <AddToCart productId={product._id} isCart={!!product.isCart} />
                                           </div>
                                          
           
                                       </div>
                                   </div>
                               )
                           })}
                       </div>
        </>
    )
}

export default CategoryProducts