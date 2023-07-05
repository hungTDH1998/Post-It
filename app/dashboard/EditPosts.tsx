'use client'

import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import axios, { AxiosError } from 'axios';
import { useMutation , useQueryClient} from "@tanstack/react-query"
import toast from "react-hot-toast"

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
    //Toggle on-off
    const [toggle, setToggle] = useState(false)
    let deleteToastId: string 
    const queryClient = useQueryClient()
    // Delet post
    // const { mutate } = useMutation(
    //     async (id: string) => await axios.delete('/api/posts/deletePost', { data: id }),
    //     {
    //       onError: (error) => {
    //         toast.error('Error deleting that post', { id: deleteToastId });
    //       },
    //       onSuccess: (data) => {
    //         toast.success("Post has been deleted", { id: deleteToastId });
    //         queryClient.invalidateQueries(["auth'ed-posts"]);
    //       }
    //     }
    //   );

    const {mutate} = useMutation(
        async (id: string) => {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/deletePost`, { data: id })
            return response.data
        },
        {
            onError: (error: AxiosError) => {
                console.error('Error deleting that post', error);
                toast.error('Error deleting that post', { id: deleteToastId });
            },
            onSuccess: (data) => {
                toast.success("Post has been deleted", { id: deleteToastId });
                queryClient.invalidateQueries(["auth'ed-posts"]);
            }
        }
    );
    const deletePost = () => {
        deleteToastId = toast.loading("deleting post", {id: deleteToastId})
        mutate(id)
    }

    return(
    <>
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
                <button onClick={(e) => {
                    setToggle(true)
                }} className="text-sm font-bold text-red-700 ">delete</button>
            </div>
        </div>
        {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
    )
}