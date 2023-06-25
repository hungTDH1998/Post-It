'use client'

import React, { useState } from "react"
import { useMutation,useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { data } from "autoprefixer"


export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    // Create a Post
    const {mutate} = useMutation(
       async (title: string) => await axios.post('/api/posts/addPost', { title }),
       {
           onError: (error) => console.log(error),
           onSuccess: (data) => {
               console.log(data)
               setTitle("")
               setIsDisabled(false)
           }
       }
    )
    const submitPost = async(e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        mutate(title) 
    }
    return (
    <form onSubmit={submitPost} className="bg-white my-6 p-8 rounded-md">
        <div className="flex flex-col my-2">
            <textarea 
            onChange={(e) => setTitle(e.target.value)}
            name="title" 
            value={title}
            placeholder = "what's u think?"
            className="p-4 text-lg rounded-md my-2 bg-gray-200"
            >    
            </textarea>
        </div>
        <div className="flex items-center justify-between gap-2">
            <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-grey-200"}`}> {`${title.length}/300`} </p>
            <button className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                    disabled={isDisabled}>
                Create a post
            </button>
        </div>
    </form>
  )
}
