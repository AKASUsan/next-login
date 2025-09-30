import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mut"); // change to your DB name
    const collection = db.collection("superstore");

    // 1. Total Sales
    const totalSaleAgg = await collection
      .aggregate([{ $group: { _id: null, total: { $sum: "$Sales" } } }])
      .toArray();
    const totalSale = totalSaleAgg[0]?.total || 0;
// 2. Sales by Region
    const salesByCity = await collection
      .aggregate([
        { $group: { _id: "$Region", total: { $sum: "$Sales" } } },
        { $sort: { total: -1 } },
      ])
      .toArray();
      // 3. Sales by Product ID
    const salesByProduct = await collection
      .aggregate([
        { $group: { _id: "$Sub-Category", total: { $sum: "$Sales" } } },
        { $sort: { total: -1 } },
      ])
      .toArray();

    const leastsales = await collection
     .aggregate([
        {$group: {
          _id:"$Country/Region",
          total:{$min:"$Sales"}
        }},
         { $sort: { total: 1 } },
        {$limit:10}
      ])
      .toArray();
    const salestopjapan  = await collection
    .aggregate([
      {$match:{
        "Country/Region":"Japan"
      }},
      {$group: {
        _id: "$City",
        total:{$max:"$Sales"}
      }},
       { $sort: { total: -1 } },
        {$limit:5}
    ])
    .toArray();
   
    return NextResponse.json({
      totalSale,
      salesByCity,
      salesByProduct,
      leastsales,
      salestopjapan,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

 

   



}
