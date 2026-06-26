import React from 'react'
import productsModel from "@/models/createproduct";
import { notFound } from 'next/navigation';
import AddToCart from '@/components/AddToCart';
const productdetail = async ({
    params
}: { params: any }) => {
     const {id} = await params;
     let product = null
     try {
         product = await productsModel.findOne({_id:id}).lean();

        if(!product) {
          return  notFound()
        }
     } catch (error) {
        return  notFound()
     }
        
  return (
    <div className="flex">
                            <div className="   rounded-3xl mt-10 mb-5 p-[0,20px,10px]  ml-10 flex flex-col gap-5 ">
                                <div className='flex justify-center'>
                                <img src={product.images[0]} alt="" className="h-60 w-60  " />
                                </div>
                                <p className="text-center font-bold text-[15px] cursor-pointer">Name:       {product.name}</p>
                                {/* <p className="text-center text-[14px] text-[#76767f] font-bold cursor-pointer">{product.categoryId.title}</p> */}
                                 <p className="text-2xl flex justify-center ">$Price:{product.price}</p>
                                <div className="flex justify-center items-center gap-15 ">
                                   
                                    <button className="bg-black text-white p-3 rounded-2xl ">Quick buy</button>
                                   <AddToCart productId={product._id} />
                                </div>
                                 <p className="text-center text-[14px] text-[#76767f] font-bold cursor-pointer">Description:{product.description}</p>
                                {/* <div className="flex gap-1 ml-7 w-60 ">
                                    <Swiper
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
                                    </Swiper>
                                </div> */}
                            </div>
                        </div>
  )
}

export default productdetail