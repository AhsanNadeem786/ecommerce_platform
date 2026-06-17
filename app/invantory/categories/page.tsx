"use client"
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { AvatarUploader } from "@/components/avatar-uploader";
export default function Categories() {
    const path = usePathname()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
      const [images, setImages] = useState<String[]>([])
       const [categoryImage, setcategoryImage] = useState("")
    const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            alert("Please fill in all required fields");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description ,images }),
            });
            if (!res.ok) {
                throw new Error("Failed to add category");
            }
            const data = await res.json();
            console.log("Category added:", data);
            setTitle("");
            setDescription("");
            setImages([])
        } catch (error) {
            console.error("Error adding category:", error);
        } finally {
            setLoading(false);
        }
    };
     async function saveAvatar(url: String) {
        setImages((prev: any) => {
            const oldState = [...prev];
            oldState.push(url)
            return oldState
        })
    }
    return (
        <div className="container -mt-150 flex justify-center">
            <form onSubmit={handleAddCategory} className="w-125 h-96 bg-white shadow-lg rounded-lg flex mt-20 justify-start items-start flex-col">
                <h1 className="text-2xl font-bold mb-4 ml-35">Categories</h1>

                <input type="text" placeholder="title" className="h-10 w-64 border border-gray-300 rounded-lg px-4 py-2 ml-30 mt-5" value={title} onChange={(e) => setTitle(e.target.value)} />

                <input type="text" placeholder="description" className="h-10 w-64 border border-gray-300 rounded-lg px-4 py-2 ml-30 mt-5" value={description} onChange={(e) => setDescription(e.target.value)} />
                  {categoryImage && <img src={categoryImage} alt="uploadImage" />}
                                    <AvatarUploader
                                     onUploadSuccess={saveAvatar} 
                                    
                                    />
                                     {
                                       images.map((imgSrc:String,index)=>{
                                        return(
                                        <Image src={imgSrc} alt="Image" key={index} width={200} height={200} />)
                                       })
                                     }
                <button type="submit" className="h-10 w-64 bg-blue-500 text-white rounded-lg px-4 py-2 ml-30 mt-5 hover:bg-blue-600" disabled={loading}>
                    {loading ? "Adding..." : "Add Category"}
                </button>
            </form>
        </div>
    );
}