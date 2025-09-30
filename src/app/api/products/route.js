import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb"  
import Product from "../../../../models/Product";


// GET all products
export async function GET() {
  await connectMongoDB();
  const products = await Product.find().sort({ ProId: 1 });
  return NextResponse.json(products);
}


// POST new product with auto ProId
export async function POST(req) {
  await connectMongoDB();
  const data = await req.json();


  // find the last ProId
  const lastProduct = await Product.findOne().sort({ ProId: -1 });
  let newProId = "Pro001";


  if (lastProduct) {
    const lastIdNum = parseInt(lastProduct.ProId.replace("Pro", "")); // e.g., Pro007 → 7
    const nextIdNum = lastIdNum + 1;
    newProId = "Pro" + nextIdNum.toString().padStart(3, "0");
  }


  const newProduct = await Product.create({
    ...data,
    ProId: newProId,
  });


  return NextResponse.json(newProduct);
}


