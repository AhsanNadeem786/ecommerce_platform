import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Sidebar from "@/components/Sidebar";



export const metadata: Metadata = {
  title: "inventory system",
  description: "inventory system",
};

export default function InvantoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Sidebar />
        {children}
    
   </div>
  );
}
