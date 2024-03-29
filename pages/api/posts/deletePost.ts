import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import prisma from "../../../prisma/client"



export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." })
  }
  if (req.method === "POST") {
    const postId = req.body.id

    try {
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while deleting a post" })
    }
  }
}