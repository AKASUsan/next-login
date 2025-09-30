"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";


export default function CreateProduct() {
  const [form, setForm] = useState({ ProName: "", Price: "", Amount: "" });
  const [file, setFile] = useState(null);
  const router = useRouter();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    let imgPath = "";
    if (file) {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const uploadRes = await res.json();
      imgPath = uploadRes.path;
    }


    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, ProImg: imgPath }),
    });


    router.push("/");
  };


  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="ProName"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          name="Price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          name="Amount"
          placeholder="Amount"
          type="number"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border px-3 py-2 rounded-lg text-black"
        />


        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow "
        >
          Save
        </button>
      </form>
    </div>
  );
}
