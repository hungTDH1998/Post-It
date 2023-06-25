import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import prisma from "../../../prisma/client"

export default  async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST") {
        const session = await getServerSession(req,res, authOptions)
        if(!session) 
            return res.status(401).json({message: "plz sign in to create posts"})
        const title: String = req.body.title 

        //Get User 
        const prismaUser = await prisma.user.findUnique({
            where: { email: session?.user?.email },
        }) 
        //Check Title length
        if(title.length > 300) 
            return res.status(403).json({message: "pls write a shorter post"})
        if(!title.length)
            return res.status(403).json({message: "do not leave empty"})
        // Create post
        try {
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser.id,
                }
            })
            res.status(200).json(result)
        } catch (error) {
            res.status(403).json({err: "error has occured while making a post"})
        }

    }
}
