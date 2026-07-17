export default function Footer() {
  return (
    <>
      <div className="w-full bg-black text-white p-15 flex flex-col md:flex-row justify-between gap-10 md:gap-20">
  
        <div className="flex flex-col gap-10">
          <img src="header-1.png" alt="Logo" className="w-40 h-auto" />
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              placeholder="Enter your email" 
              className="p-3 border text-white w-full sm:w-64" 
            />
            <button className="bg-red-700 p-3 font-semibold hover:bg-red-800 transition">
              Subscribe
            </button>
          </div>
        </div>

      
        <div className="flex flex-col gap-2">
          <p className="font-bold text-red-800 text-lg">Customer Care</p>
          <p className="cursor-pointer hover:text-gray-400">FAQS</p>
          <p className="cursor-pointer hover:text-gray-400">Contact Us</p>
          <p className="cursor-pointer hover:text-gray-400">Returns & Exchange Policy</p>
          <p className="cursor-pointer hover:text-gray-400">Retail Policy</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-red-800 text-lg">Information</p>
          <p className="cursor-pointer hover:text-gray-400">Warranty Information</p>
          <p className="cursor-pointer hover:text-gray-400">Shipping Policy</p>
          <p className="cursor-pointer hover:text-gray-400">Modes of Payment</p>
          <p className="cursor-pointer hover:text-gray-400">Privacy Policy</p>
          <p className="cursor-pointer hover:text-gray-400">Terms of Service</p>
        </div>
      </div>
    </>
  )
}
