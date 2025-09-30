"use client";

import React, {useState} from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Container from "../components/Container";
import Footer from "../components/Footer";
import {signIn} from "next-auth/react"
import { useRouter, redirect} from "next/navigation";
import { useSession } from "next-auth/react";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    
    const {data: session} = useSession();
    if (session) router.replace("welcome");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await signIn("credentials",
                {
                    email,
                    password,
                    redirect:false,
                });

            if(res.error){
            setError("Invalid credentials");
            return
        }
        router.replace("welcome");
    }catch(error){
        console.log(error);
    }
        
}
    return(
        <Container>
        <Navbar />
          <div className="flex-grow">
            <div className="flex justify-center items-center">
                <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
                    <h3 className="text-3xl">Login Page!!</h3>
                    <hr className="my-3" />
                    <form onSubmit={handleSubmit}>
                       
                        <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        className="block bg-gray-300 p-2 my-2 rounded-md" 
                        placeholder="Enter your email"
                        />
                        <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        className="block bg-gray-300 p-2 my-2 rounded-md" 
                        placeholder="Enter your password" 
                        />
                        
                        <button type="submit" className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2">
                            Login
                        </button>

                    </form>
                    <hr className="my-3" />
                    <p>
                        Alredy have an account go to {" "}
                        <Link href="/register" className="text-blue-500 hover:underline" >
                            Register Page
                        </Link>{" "}Page
                        
                    </p>
                </div>

            </div>
        </div>
       

       <Footer />
      </Container>
    );
    
}

export default LoginPage