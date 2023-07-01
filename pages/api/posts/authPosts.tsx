import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import prisma from "../../../prisma/client"


export default  async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "GET") {
        const session = await getServerSession(req,res, authOptions)
        if(!session) 
            return res.status(401).json({message: "plz sign in "})


        // get Auth'ed users Posts
        try {
            const data = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email,
                },
                include: {
                    Post : {
                        orderBy: {
                            createdAt: "desc"
                        },
                        include: {
                            Comment: true,
                        }
                    }
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(403).json({err: "error has occured while making a post"})
        }

    }
}
