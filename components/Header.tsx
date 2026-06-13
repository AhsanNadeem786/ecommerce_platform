import { FaShoppingCart } from "react-icons/fa";
import { images } from "/public/images";
import { IoIosContact } from "react-icons/io";
export default function Header() {
    return <header className=" py-7 bg-black text-white ">
        <div className="h-15 w-full max-w-375 m-auto">
            <div className="flex items-center justify-between">
                <img src="header-1.png" alt="" className="w-10 h-8" />
                <IoIosContact size={14} className="text-white   " />
                <input type="text" placeholder="Search Product" className="border-2 border-blue-500 rounded-lg p-2" />
                <FaShoppingCart />

            </div>
        </div>
    </header>
}