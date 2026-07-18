"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AvatarUploader } from "@/components/avatar-uploader";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function UpdateCreateProduct() {
    const [productName, setProductName] = useState("");
    const path = usePathname()
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [image, setimage] = useState("")

    const [showcategory, setShowcategory] = useState<any[]>([])
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([])
    const [productImage, setProductImage] = useState("")
    const id = path.split("/")[2]
  const handleUpdated = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);

  try {
    const res = await fetch(`/api/create-product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        price,
        quantity,
        categoryId,
        description,
        image,
        images,
      }),
    });

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
    const fetchCategories = async () => {
        try {
            const res = await fetch(`/api/create-product/${id}`);
            const data = await res.json();

            setProductName(data.data.name)
            setPrice(data.data.price)
            setQuantity(data.data.quantity)
            setCategoryId(data.data.categoryId)
            setDescription(data.data.description)
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = e.target.value

        setCategoryId(categoryId);
    };
    async function saveAvatar(url: string) {
        setImages((prev: any) => {
            const oldState = [...prev];
            oldState.push(url)
            return oldState
        })
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className="flex justify-center h-130 w-full bg-gray-50 ">
            <div className="w-full max-w-md bg-white shadow-2xl  rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Product
                </h1>

                <form onSubmit={handleUpdated} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Product name"
                        className="w-full h-10 border border-gray-300 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full h-10 border border-gray-300 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <Input
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
                    {productImage && <img src={productImage} alt="uploadImage" />}
                    <AvatarUploader
                        onUploadSuccess={saveAvatar}

                    />
                    {
                        images.map((imgSrc, index) => (
                            <Image
                                key={index}
                                src={imgSrc}
                                alt="Image"
                                width={200}
                                height={200}
                            />
                        ))
                    }
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:bg-blue-300"
                    >
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
