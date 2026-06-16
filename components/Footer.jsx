export default function Footer() {
    return (
        <>
            <div className="w-full h-125 bg-black text-white p-3 flex gap-80 ">
                <div>
                <img src="header-1.png" alt="" className="w-50  ml-20 mt-20 h-30" />
                <input type="text" placeholder="Enter your email" className="mt-20 ml-20 p-3 border " />
                <button className="bg-red-700 p-3.5">Subcribe</button>
                
                </div>
                <div className="mt-20 gap-5">
                    <p className="font-bold text-red-800">Customer Care</p>
                    <p>FAQS</p>
                    <p>Contact Us</p>
                    <p>Returns & Exchange Policy</p>
                    <p>Retail Policy</p>
                    <p>Warranty Information</p>
                    <p>Shipping Policy</p>
                    <p>Modes of Payment</p>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
               
            </div>

        </>
    )
}