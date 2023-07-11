import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import prisma from "../../../prisma/client"


export default  async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST") {
        const session = await getServerSession(req,res, authOptions)
        if(!session) 
            return res.status(401).json({message: "plz sign in "})
        // Get a user
        const prismaUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        })

        // Add a Comment
        try {
            const {title, postId} = req.body.data
            if(!title.length) {
                return res.status(401).json({message: "please enter STH"})
            }
            const result = await prisma.comment.create({
                data: {
                    message: title,
                    userId: prismaUser?.id,
                    postId
                }
            })
            res.status(200).json(result)
        } catch (error) {
            res.status(403).json({err: "error has occured while making a post"})
        }

    }
}
