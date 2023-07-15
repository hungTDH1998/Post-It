'use client'

import React from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'


type User = {
    image : any
}

export default function Logged({ image }: User) {
  return (
    <li className='flex gap-8'>
        <button onClick={() => signOut()} className='bg-gray-700 text-sm text-white px-6 py-2 rounded-md'>
            Sign out
        </button>
        <Link href={"/dashboard"}>
            <Image width={64} 
            height={64} 
            src={image} 
            className="w-10 rounded-full"
            alt='' priority
            />
        </Link>
    </li>
  )
}
