import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import prisma from "../../../prisma/client"


export default  async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "DELETE") {
        const session = await getServerSession(req,res, authOptions)
        if(!session) 
            return res.status(401).json({message: "plz sign in "})

        // Delete a post
        
        try {
            // Retrieve the post ID from the request body
      const { postId } = req.body;

      // Retrieve the authenticated user ID from the session
      const authenticatedUserId = session?.user?.userId; 

      // Retrieve the post from the database
      const post = await prisma.post.findUnique({ where: { id: postId } });

      // Check if the post exists
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if the authenticated user is the owner of the post
      if (post.userId !== authenticatedUserId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // Delete the post
      await prisma.post.delete({ where: { id: postId } });
            // Return a success response
      res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            res.status(403).json({err: "error has occured while deleting a post"})
        }

    }
}

