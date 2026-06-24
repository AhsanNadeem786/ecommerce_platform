"use client";
import { AvatarUploader } from "@/components/avatar-uploader";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";


export default function CreateProduct() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [showcategory, setShowcategory] = useState<any[]>([])
    const [loading, setLoading] = useState(false);
    const [productImage, setProductImage] = useState("")
    const [images, setImages] = useState<String[]>([])
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productName || !price || !quantity || !categoryId) {
            alert("Please fill in all required fields");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/create-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    images:images,
                    productName,
                    price: Number(price),
                    quantity: Number(quantity),
                    categoryId,
                    description,
                }),
            });

            if (res.ok) {
                
                setProductName("");
                setPrice("");
                setQuantity("");
                setCategoryId("");
                setDescription("");
                setImages([])
            } else {
                console.error("Failed to create product");
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setShowcategory(data.data || []);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = e.target.value
        setCategoryId(categoryId);
    };


    useEffect(() => {
        fetchCategories();
    }, []);
    // const handleImageChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     setProductImage(file ? URL.createObjectURL(file) : "")

    // }



    async function saveAvatar(url: String) {
        setImages((prev: any) => {
            const oldState = [...prev];
            oldState.push(url)
            return oldState
        })
    }



    return (
        <div className="flex justify-center items-start  bg-gray-50 ">
            <div className="w-full max-w-md bg-white shadow-2xl -mt-150 rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Product
                </h1>

                <form onSubmit={handleCreate} className="flex flex-col gap-4">
                   
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Product name"
                        className="w-full h-10 border border-gray-300 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full h-10 border border-gray-300 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                        className="w-full h-10 border border-gray-300 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={categoryId}
                        onChange={handleCategoryChange}

                        className="w-full h-10 border border-gray-300 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="">Select Category</option>
                        {showcategory.map((category: any) => (
                            <option key={category._id} value={category._id}>
                                {category.title}
                            </option>
                        ))}
                    </select>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                         {/* <input
                        // type="file"
                        onChange={handleImageChange}
                    /> */}
                    {productImage && <img src={productImage} alt="uploadImage" />}
                    <AvatarUploader
                     onUploadSuccess={saveAvatar} 
                    
                    />
                     {
                       images.map((imgSrc:String,index)=>{
                        return(
                        <Image src={imgSrc} alt="Image" key={index} width={200} height={200} />)
                       })
                     }
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:bg-blue-300"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
}
