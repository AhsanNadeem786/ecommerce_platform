'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
   
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <div className={`
        fixed md:static top-0 left-0 h-screen bg-black text-white flex flex-col w-64 p-6 transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <h1 className="font-bold text-center mt-20 text-xl px-2">
          Welcome to Inventory System
        </h1>
        
        <nav className="flex flex-col mt-10 space-y-4">
          <Link href="/invantory/products" className="hover:bg-gray-800 p-2 rounded text-center transition">
            Products
          </Link>
          <Link href="/invantory/category" className="hover:bg-gray-800 p-2 rounded text-center transition">
            Category
          </Link>
          <Link href="/invantory/profile" className="hover:bg-gray-800 p-2 rounded text-center transition">
            Profile
          </Link>
        </nav>
      </div>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
}
