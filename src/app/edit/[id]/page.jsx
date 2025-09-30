"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function EditProduct({ params }) {
  const { id } = params;
  const router = useRouter();
  const [form, setForm] = useState({
    ProName: "",
    Price: "",
    Amount: "",
    ProImg: "",
  });
  const [file, setFile] = useState(null);


  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    let imgPath = form.ProImg;
    if (file) {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const uploadRes = await res.json();
      imgPath = uploadRes.path;
    }


    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, ProImg: imgPath }),
    });


    router.push("/");
  };


  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="ProName"
          value={form.ProName}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          name="Price"
          type="number"
          value={form.Price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          name="Amount"
          type="number"
          value={form.Amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
        />


        {form.ProImg && (
          <img
            src={form.ProImg}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg mb-2"
          />
        )}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border px-3 py-2 rounded-lg text-black"
        />


        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow text-black"
        >
          Update
        </button>
      </form>
    </div>
  );
}
