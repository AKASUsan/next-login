import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Product from "../../../../../models/Product";


export async function GET(req, { params }) {
  await connectMongoDB();
  const product = await Product.findById(params.id);
  return NextResponse.json(product);
}
export async function PUT(req, { params }) {
  await connectMongoDB();
  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}


export async function DELETE(req, { params }) {
  await connectMongoDB();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}



