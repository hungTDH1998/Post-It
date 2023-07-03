'use client'

import Image from "next/image"
import { useState } from "react"

type EditProps = {
    id: string
    avatar: string
    name: string
    title: string
    comments: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPosts({ avatar, name, id, title, comments }: EditProps) {
    return(
        <div className="bg-white my-8 rounded-xl">
            <div className="flex items-center gap-2">
            <Image 
                    className="rounded-full my-2 mx-2 "
                    width={30}
                    height={30}
                    src={avatar}
                    alt= "avatar"
            />
            <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8 mx-2">
                <p className="break-all"> {title}</p>
            </div>
            <div className="flex items-center gap-4 ml-2">
                <p className="text-sm text-gray-700 font-bold">
                    {comments.length} Comments
                </p>
                <button className="text-sm font-bold text-red-700 ">delete</button>
            </div>
        </div>
    )
}