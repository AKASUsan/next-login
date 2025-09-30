"use client";

import React, {useState} from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Container from "../components/Container";
import Footer from "../components/Footer";

function RegisterPage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [role,setRole] = useState("user");
const [error,setError] = useState("");
const [success , setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password != confirmPassword) {
            setError("Password do not match!");
            return;
        };
        if(!name || !email || !password || !confirmPassword || !role) {
            setError("Please complete all inputs.");
            return;
        };
        try{
    

            const res = await fetch("http://localhost:3001/api/register",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                }),
            });
            if(res.ok){
                const form = e.target;
                setError("");
                setSuccess("User Registration Successfully!");
                form.reset();
            }else {
                console.log("User registration failed.");
            };
        }catch(error){
            console.log("Error during registraion: " , error);
        };
    }
    return(
       <Container>
        <Navbar />
         <div className="flex-grow">
            <div className="flex justify-center items-center">
                <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
                    <h3>Register!!</h3>
                    <hr className="my-3" />
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                                {success}
                            </div>
                        )}
                        <input 
                        onChange={(e) => setName(e.target.value)} 
                        type="text" 
                        className="block bg-gray-300 p-2 my-2 rounded-md"
                        placeholder="Enter your name" />
                        <input 
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" 
                        className="block bg-gray-300 p-2 my-2 rounded-md" 
                        placeholder="Enter your email" />
                        <input 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        className="block bg-gray-300 p-2 my-2 rounded-md" 
                        placeholder="Enter your password" />
                        <input 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password" 
                        className="block bg-gray-300 p-2 my-2 rounded-md" 
                        placeholder="Confirm your password" />
                        <select className="block bg-gray-300 p-2 my-2 rounded-md w-full"  
                        value={role}
                        onChange={(e) => setRole(e.target.value)} 
                        >
                            <option value="user"  >User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button 
                        type="submit" 
                        className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2">
                            sign Up
                        </button>

                    </form>
                    <hr className="my-3" />
                    <p>
                        Go to {" "}
                        <Link href="/login" className="text-blue-500 hover:underline" >
                            Login
                        </Link>
                        Page
                    </p>
                </div>
            </div>
        </div>
        <Footer />
      </Container>
    )
}

export default RegisterPage