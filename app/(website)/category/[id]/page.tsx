import AddToCart from "@/components/AddToCart";
import Category from "@/models/Category";
import productsModel from "@/models/createproduct";
import Link from "next/link";

import React from 'react'
// import { EffectCoverflow, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
const CategoryProducts = async ({
    params
}: { params: any }) => {
    // const router = useRouter()
    const { id } = await params;
    const products = await productsModel.find({ categoryId: id }).lean();
    const caterogyData = await Category.findOne({ _id: id }, "title").lean()


    // const handleProductDetail = (id: any) => {
    //     router.push(`/productdetail/${id}`)
    // }
    return (
        <>
            <h1 className="bg-black text-white h-10 mt-5 text-center ">{caterogyData.title}</h1>
            <div className="grid grid-cols-4 w-full">

                {products.map((product: any) => {
                    return (

                        <div key={product._id} className="flex">
                            <div className="bg-[#f8f9fc] h-[450px] w-70.5  rounded-3xl mt-50 p-[0,20px,10px] border border-[#00000017] shadow-xl ml-10 flex flex-col gap-5 ">
                                <Link href={`/productdetail/${product._id}`}>
                                    <img src={product.images[0]} alt="" className="h-60 w-60 m-5" />
                                    <p className="text-center font-bold text-[15px] cursor-pointer">{product.name}</p>
                                    <p className="text-2xl flex justify-center">${product.price}</p>
                                </Link>
                                {/* <p className="text-center text-[14px] text-[#76767f] font-bold cursor-pointer">{product.categoryId.toString()}</p> */}
                                <div className="flex justify-center items-center gap-15 ">

                                    <button className="bg-black text-white p-3 rounded-2xl ">Quick buy</button>
                                    <AddToCart />
                                </div>
                                <div className="flex gap-1 ml-7 w-60 ">
                                    {/* <Swiper
                                        slidesPerView={4}
                                         spaceBetween={30}
                                        centeredSlides={true}
                                        // pagination={{
                                        //     clickable: true,
                                        // }}
                                        // modules={[Pagination]}
                                        className="mySwiper"
                                    >
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
                                            return (
                                                <SwiperSlide key={index}><img src="/home -9.png" alt="" className="w-10 h-10 border" /></SwiperSlide>
                                            )
                                        })}
                                    </Swiper> */}
                                </div>

                            </div>
                        </div>

                    )
                })}
            </div >
        </>
    )
}

export default CategoryProducts