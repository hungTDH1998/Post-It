"use client"

import axios from "axios"
import CreatePost from "./components/AddPost"
import { useQuery } from "@tanstack/react-query"
import Post from "./components/Post"
import { PostType } from "./types/Posts"

// fetch all posts
const allPosts = async() => {
  const response = await axios.get('/api/posts/getPost')
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  })
  if(error) return error
  if(isLoading) return "Loading ..."
  
  return (
    <main >
      <CreatePost/>
      {data?.map((post) => (
        <Post key={post.id}
              name={post.user.name}
              avatar={post.user.image}
              postTitle={post.title}
              id = {post.id}
              comment = {post.Comment}
              />
      ))}
    </main>
  )
}
