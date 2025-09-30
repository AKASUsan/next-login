import {  NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try{
     const {name , email , password, role} = await req.json();
     const hashedPassword = await bcrypt.hash(password, 10);

     await connectMongoDB();
         if (role === "Admin") {
      await admin.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
    } else {
      await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
    }

     return NextResponse.json({message:"User regustered."}, {status: 201});
    }catch (error){
     return NextResponse.json(
            {message: "An error occured while registering the user. "},
            {status:500}
        )
    }
}