"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image"

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetaisl = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetaisl(url.params.slug),
  });
  if (isLoading) return "Loading...";
  

  return (
    <div>
      <Post
        id={data.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        comment={data.Comment}
      />
      <AddComment id={data?.id} />
      {data?.Comment?.map((comment: any) => (
        <div key={comment.id} className="bg-white my-8 rounded-xl p-2">
          <div className="flex items-center gap-2">
            <Image 
                    width={24}
                    height={24}
                    src={comment.user?.image}
                    alt= "avatar"
                    className="rounded-full my-1 mx-1 "
            />
            <h3 className="font-bold ">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4 ml-2">
            {comment.message}
          </div>  
        </div>
      ))}
    </div>
  );
}
