"use client"
// import images from "next/image"
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import { Button } from '@/components/ui/button';

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
    const handleCaterogyShow = () => {
        router.push("/showcaterogy")
    }
    return (
        <>
            <img src="/header-2.jpg" alt="Header Image" className="w-full h-auto object-cover" />


            <div className="bg-white shadow-olive-200  max-w-6xl mx-auto px-4 mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {caterogy.slice(0, 6).map((cat: any) => {
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
            <div className="flex justify-center mt-12 md:mt-24 lg:mt-30">
                <Button
                    onClick={handleCaterogyShow}
                    className="bg-black text-white h-10 w-28 sm:w-32 md:w-36 text-sm md:text-base rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-800"
                >
                    View All
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 p-4">
                {products.slice(0, 8).map((product: any) => {
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
                                    <Button className="bg-black text-white p-3 rounded-2xl w-full max-w-30">
                                        Quick buy
                                    </Button>
                                    <AddToCart productId={product._id} isCart={!!product.isCart} />
                                </div>
                                <div className="flex justify-center w-full">
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={10}
                                        centeredSlides={true}
                                        className="mySwiper w-full max-w-60"
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

            <div className="flex justify-center mt-12 md:mt-24 lg:mt-30">
                <Button onClick={handleProductShow} className="bg-black text-white h-10 w-28 sm:w-32 md:w-36 text-sm md:text-base rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-800">veiw all</Button>
            </div>

            <div className="mt-6 p-5  justify-center md:ml-10 flex  flex-col md:flex-row gap-6 md:gap-20">
                <img src="/home 10.jfif" alt="" className="max-w-90 w-full  md:w-65 h-auto md:h-140 rounded-2xl object-cover" />
                <img src="/home 11.jfif" alt="" className="max-w-90 w-full  md:w-70 h-auto md:h-140 rounded-2xl object-cover" />
                <img src="/home 12.jfif" alt="" className="max-w-90 w-full  md:w-70 h-auto md:h-140 rounded-2xl object-cover" />
            </div>
            <div className=" h-auto flex justify-center p-5 md:w-full md:p-10 overflow-hidden">
                <video src="home-vedio.mp4" autoPlay={true} loop={true} muted={true} className="rounded-4xl"></video>
            </div>
            <div className="mt-10 md:mt-20 px-5 md:ml-10 flex gap-5">
                <Swiper
                    spaceBetween={20}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide><video src="home 13.webm" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                    <SwiperSlide><video src="hmoe 14.mp4" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                    <SwiperSlide><video src="home14.mp4" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                    <SwiperSlide><video src="home 15.mp4" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                    <SwiperSlide><video src="home 16.mp4" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                    <SwiperSlide><video src="home 17.mp4" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                    <SwiperSlide><video src="home 18.mp4" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                    <SwiperSlide><video src="home 19.mp4" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                    <SwiperSlide> <video src="home 20.mp4" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                    <SwiperSlide> <video src="home 21.mp4" autoPlay={true} loop={true} muted={true} className="h-150 w-110.5 rounded-[20px]"></video></SwiperSlide>
                </Swiper>
            </div>






            <div className="flex flex-wrap justify-between gap-4 px-10">
                <img src="/home 22.png" alt="Home 22" className="w-full max-w-62.5 object-cover" />
                <img src="/home 23.png" alt="Home 23" className="w-full max-w-62.5 object-cover" />
                <img src="/home 24.png" alt="Home 24" className="w-full max-w-62.5 object-cover" />
                <img src="/home 25.png" alt="Home 25" className="w-full max-w-62.5 object-cover" />
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