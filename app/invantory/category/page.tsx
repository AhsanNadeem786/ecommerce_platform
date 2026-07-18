"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Category() {
  const [showcategory, setShowcaterogy] = useState<any[]>([]);
  const router = useRouter();

  const fetchCategroy = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data?.data) setShowcaterogy(data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategroy();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      setShowcaterogy((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id: string) => {
    router.push(`/invantory/categories/${id}`);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6">
        Categories
      </h1>

      <div className="flex justify-end mb-6">
        <Link
          href="/invantory/categories"
          className="bg-black text-white hover:bg-black/80 border border-gray-300 rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors"
        >
          Create Categories
        </Link>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full min-w-150 border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-800 text-white text-center">
            <tr>
              <th className="px-4 py-3 font-semibold border-b">Category Name</th>
              <th className="px-4 py-3 font-semibold border-b">Description</th>
              <th className="px-4 py-3 font-semibold border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border-t border-gray-200">
            {showcategory.map((item: any) => (
              <tr key={item._id} className="text-center hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 font-medium text-gray-900 border-b">
                  <div className="flex items-center justify-center gap-2">
                    {item.images?.[0] && (
                      <Image
                        src={item.images[0]}
                        alt={item.title || "Category image"}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span>{item.title}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-600 border-b max-w-xs truncate">
                  {item.description}
                </td>
                <td className="px-4 py-4 border-b">
                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={() => handleEdit(item._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 h-auto text-xs sm:text-sm rounded"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 h-auto text-xs sm:text-sm rounded"
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
