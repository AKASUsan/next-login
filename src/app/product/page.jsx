"use client";


import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";




export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();


  const loadProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };


  useEffect(() => {
    loadProducts();
  }, []);


  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });


    if (confirmed.isConfirmed) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      loadProducts();
    }
  };

  const { data: session } = useSession();
  if (!session) {
    router.replace("/login");
    return null;
  }

  
  return (
    <>
      <Navbar session={session} />
      <div className="max-w-6xl mx-auto p-6"> 
        {session.user.role === "admin" ? (
       <>
         <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <a
            href="/create"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            + Add Product
          </a>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4"
            >
              {p.ProImg && (
                <img
                  src={p.ProImg}
                  alt={p.ProName}
                  className="w-full h-40 object-cover rounded-md mb-4 text-black"
                />
              )}
              <h2 className="text-lg font-semibold text-black">{p.ProName}</h2>
              <p className="text-gray-600 ">Price: ${p.Price}</p>
              <p className="text-gray-600">Amount: {p.Amount}</p>


              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => router.push(`/edit/${p._id}`)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
       </>
        )  : (
          <>
          {session.user.role === "user" && (
            
            <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
             
            </div>
        

          )}  
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4"
            >
              {p.ProImg && (
                <img
                  src={p.ProImg}
                  alt={p.ProName}
                  className="w-full h-40 object-cover rounded-md mb-4 text-black"
                />
              )}
              <h2 className="text-lg font-semibold text-black">{p.ProName}</h2>
              <p className="text-gray-600 ">Price: ${p.Price}</p>
              <p className="text-gray-600">Amount: {p.Amount}</p>


      
            </div>
          ))}
          </div>
          </>
        )}
       
       
      </div>
    </>
  );
}
