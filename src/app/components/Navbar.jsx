"use client"

import React from 'react'
import Link from 'next/link'
import NextLogo from "../../../public/next.svg"
import Image from 'next/image'
import { signOut } from 'next-auth/react'

// import {signOut} from next-auth/react;

function Navbar({session}) {
  return (
    <div>
      <nav className="flex justify-between items-center shadow-md p-5 bg-white">
        <div>
            <Link href="/welcome">
             <Image src={NextLogo} width={120} height={120} alt="nextjs logo" />
            </Link>
        </div>
        <ul className='flex space-x-6 list-none'>
            {!session ? (
              <>
                <li><Link href="/login">Sing In</Link></li>
                <li><Link href="/register">Sing Up</Link></li>
              </>
            ) : (
               <>
                  <li><Link href="/product" className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2">Product</Link></li>
                  <li><Link href="/dashboard" className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2">Dashboard</Link></li>
                 <li>
                    <a 
                      onClick={() => signOut()} 
                      className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2">
                      Logout
                    </a>
                </li>
               </>
            )}
           
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
