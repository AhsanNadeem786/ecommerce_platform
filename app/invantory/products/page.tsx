"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await fetch("/api/create-product");
    const data = await res.json();
    setProducts(data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/create-product/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((data) => data._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id: string) => {
    router.push(`/invantory/products/${id}`);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 max-w-7xl mx-auto w-full">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6">
        Products
      </h1>

      <div className="flex justify-end mb-6">
        <Link
          href="/invantory/createProduct"
          className="bg-black text-white hover:bg-black/80 border border-gray-300 rounded-lg px-4 py-2 text-center text-sm sm:text-base"
        >
          Create Product
        </Link>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-300 shadow-lg">
        <table className="w-full min-w-[800px] border-collapse bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Price</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Quantity</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products?.map((product: any) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {product.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name || "Product"}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                  ${product.price}
                </td>
                <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                  {product.quantity}
                </td>
                <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                  {product.categoryId?.title}
                </td>
                <td className="px-4 py-4 text-left text-sm text-gray-600 max-w-xs truncate">
                  {product.description}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <Button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
