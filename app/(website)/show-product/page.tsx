"use client"
import { useEffect, useState } from "react";

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AddToCart from "@/components/AddToCart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function showproduct() {
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
         const handleProductDetail = (id: any) => {
        router.push(`/productdetail/${id}`)
    }
    return (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 p-4">
                {products.map((product: any) => {
                    return (
                        <div
                            onClick={() => handleProductDetail(product._id)}
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
                                <div className="flex justify-center w-full">
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={10}
                                        centeredSlides={true}
                                        className="mySwiper w-full max-w-[240px]"
                                    >
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
                                            return (
                                                <SwiperSlide key={index} className="flex justify-center">
                                                    <img src="/home -9.png" alt="Thumbnail" className="w-10 h-10 border object-cover rounded-md" />
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>

    )
}