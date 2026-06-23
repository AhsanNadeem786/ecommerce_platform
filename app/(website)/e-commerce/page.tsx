"use client"
import images from "next/image"
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AddToCart from "@/components/AddToCart";

export default function Ecommerce() {
    const [caterogy, showCaterogy] = useState<any[]>([]);
    const router = useRouter()
    const [products, setProducts] = useState<any[]>([]);

    const fetchCategroy = async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();


        showCaterogy(data.data);

    };
    useEffect(() => {
        fetchCategroy();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("/api/create-product");
        const data = await res.json();
        setProducts(data.data);

    };
    useEffect(() => {
        fetchProducts();
    }, []);
    const handleProductShow = () => {
        router.push("/show-product")
    }
    const handleCategoryRedirect = (id: any) => {
        router.push(`/category/${id}`)
    }
    const handleProductDetail = (id: any) => {
        router.push(`/productdetail/${id}`)
    }
    return (
        <>
            <img src="/header-2.jpg" alt="" />

            <div className="bg-white shadow-olive-200 h-30 mb-8 max-w-900 ml-20 mt-15 flex justify-between">
                {
                    caterogy.map((caterogy: any) => {
                        return (
                            <div onClick={() => handleCategoryRedirect(caterogy._id)} key={caterogy._id} className="flex flex-col gap-4 shadow-lg h-50    ">
                                <img src={caterogy.images} alt="" className="h-50 w-37.5 rounded- full  " />
                                <p className="font-bold  text-center text-[20px]">{caterogy.title}</p>
                            </div>
                        )
                    })
                }



            </div>
            <div className="grid grid-cols-4 w-full">

                {products.slice(0, 8).map((product: any) => {
                    return (
                        // 
                        <div onClick={() => handleProductDetail(product._id)} key={product._id} className="flex">
                            <div className="bg-[#f8f9fc] h-137.5 w-70.5  rounded-3xl mt-50 p-[0,20px,10px] border border-[#00000017] shadow-xl ml-10 flex flex-col gap-5 ">
                                <img src={product.images[0]} alt="" className="h-60 w-60 m-5" />
                                <p className="text-center font-bold text-[15px] cursor-pointer">{product.name}</p>
                                <p className="text-center text-[14px] text-[#76767f] font-bold cursor-pointer">{product.categoryId.title}</p>
                                <p className="text-2xl flex justify-center">${product.price}</p>
                                <div className="flex justify-center items-center gap-15 ">

                                    <button className="bg-black text-white p-3 rounded-2xl ">Quick buy</button>
                                    <AddToCart />
                                </div>
                                <div className="flex gap-1 ml-7 w-60 ">
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
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-center mt-10 ">
                <button onClick={handleProductShow} className="bg-black text-white h-10 w-30 rounded-4xl cursor-pointer">veiw all</button>
            </div>

            <div className="mt-6 ml-10 flex gap-20">
                <img src="/home 10.jfif" alt="" className="w-87.5 h-125 rounded-2xl" />
                <img src="/home 11.jfif" alt="" className="w-87.5 h-125 rounded-2xl" />
                <img src="/home 12.jfif" alt="" className="w-87.5 h-125 rounded-2xl" />
            </div>
            <div className="w-312.5 h-130 ml-10 mt-10 ">
                <video src="home-vedio.mp4" autoPlay={true} loop={true} className="rounded-4xl"></video>
            </div>
            <div className="mt-80 ml-10 flex gap-10">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    // modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide> <video src="home 13.webm" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                    <SwiperSlide> <video src="hmoe 14.mp4" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                    <SwiperSlide><video src="home14.mp4" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                    <SwiperSlide><video src="home 15.mp4" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                    <SwiperSlide><video src="home 16.mp4" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                    <SwiperSlide><video src="home 17.mp4" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                    <SwiperSlide><video src="home 18.mp4" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                    <SwiperSlide><video src="home 19.mp4" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                    <SwiperSlide> <video src="home 20.mp4" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                    <SwiperSlide> <video src="home 21.mp4" autoPlay={true} loop={true} className="h-150 w-87.5 rounded-4xl"></video></SwiperSlide>
                </Swiper>
            </div>
            <div className="flex justify-between ml-10 mr-10">
                <img src="/home 22.png" alt="" />
                <img src="/home 23.png" alt="" />
                <img src="/home 24.png" alt="" />
                <img src="/home 25.png" alt="" />
            </div>
            <div className="flex items-center justify-center text-center text-sm ">
                <p>SVESTON PAKISTAN | ONLINE SHOPPING FOR WRIST WATCHES IN PAKISTAN
                    <br />
                    <br />
                    Welcome to Sveston Pakistan Website, The Affordable Luxury Watch Brand in Pakistan. Sveston Is A Luxury Watch Brand with Over 4 Decades of Experience in
                    <br /> Watchmaking Industry and A Family Of 18 Million Happy Customers.
                    <br />
                    <br />
                    Experience Online Shopping for Watches in Pakistan With Free Home Delivery with Sveston Watches Original Price in Pakistan. We Encourage Shoppers to Buy <br />Wrist Watches Online from The Best Online Watch Store in Pakistan. <br />   <br />

                    Latest Sveston Watches Price in Pakistan 2026 Are Affordable Considering the Build Quality and Luxury Watch Case. We Aim to Redefine Online Watch Shopping <br /> in Pakistan By Providing Brand Warranty, Free Home Delivery and Easy to Return Facility. <br />
                    <br />
                    Sveston Tops the List of Best Watch Brands in Pakistan 2026 for its Branded Watches for Sale at Best Prices. We Encourage Shoppers to Experience Luxury and <br /> Convenience of Online Watch Shopping in Pakistan with Payment on Delivery. <br />
                    <br />
                    Buy Sveston Wrist Watches Online and Pay Cash on Delivery in Lahore, Karachi, Islamabad, Multan, Rawalpindi, Faisalabad, Hyderabad, Peshawar, Gujranwala, <br /> Dera Ismail Khan, Sialkot, Quetta, Bahawalpur And Across Country. <br />
                    <br />
                    Our Collection: Mens Watches | Ladies Watches | Couple Watches | Sports Watches | Smart Watches
                    <br /> </p>
            </div>
        </>
    )

}