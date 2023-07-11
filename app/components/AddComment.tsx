"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PostProps = {
  id?: string
}
type Comment = {
  title: string,
  postId?: string
}

export default function AddComment({ id }: PostProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (data: Comment) =>
      await toast.promise(axios.post("/api/posts/addComment", { data }), {
        loading: "Adding your comment",
        success: "Added your comment",
        error: (error) => {
          return error?.response?.data.message || "An error occurred";
        },
      }),
    {
      onError: () => {
        setIsDisabled(false);
      },
      onSuccess: () => {
        setTitle("");
        queryClient.invalidateQueries(["detail-post"]);
        setIsDisabled(false);
      },
    }
  );
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate({title, postId: id});
  };

  return (
    <form className="my-8" onSubmit={submitComment}>
      <h3>add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-sm bg-teal-600 text-white py-4 rounded-xl px-4"
          type="submit"
          disabled={isDisabled}
        >
          Add Comment
        </button>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-grey-200"
          }`}
        >
          {" "}
          {`${title.length}/300`}{" "}
        </p>
      </div>
    </form>
  );
}
