'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthPosts } from "../types/authedPosts"
import EditPosts from "./EditPosts"

const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPosts')
    return response.data
}

export default function MyPosts() {
    const {data, isLoading} = useQuery<AuthPosts>({
        queryFn: fetchAuthPosts,
        queryKey: ["auth'ed-posts"]
    })
    if(isLoading) return <h1>authed posts is loading....</h1>
    
    return(
        <div>
            {data?.Post?.map((post) => <EditPosts 
                key={post.id}
                name={data.name}
                avatar={data.image}
                title={post.title}
                id = {post.id}
                comments = {post.Comment}/>)}
        </div>
    )
}