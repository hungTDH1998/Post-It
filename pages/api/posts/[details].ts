import prisma from "../../../prisma/client"
import type { NextApiRequest, NextApiResponse } from "next";

export default  async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "GET") {


        // get Auth'ed users Posts
        try {
            const data = await prisma.post.findUnique({
                where: {
                    id: req.query.details,
                },
                include: {
                    user: true,
                    Comment: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                        include: {
                            user: true,
                        }
                    }
                }
            })
            return res.status(200).json(data)
            console.log(req.query)
        } catch (error) {
            res.status(403).json({err: "error has occured while making a post"})
        }

    }
}


