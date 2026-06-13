import Link from "next/link";

export default function Sidebar() {
  return (
   <div className="flex flex-col w-50 bg-black h-screen">
    <h1 className="font-bold text-center text-white mt-20">Welcome to Inventory System</h1>
    <Link href="/invantory/products" className="text-white text-center mt-10">Products</Link>
    <Link href="/invantory/category" className="text-white text-center mt-10">Categroy</Link>
    
   </div>
  );
}
