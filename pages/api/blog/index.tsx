import { NextApiRequest, NextApiResponse } from "next";
// import blogs from "@/db/blog.json";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // User is authenticated, so return the data
  // res.status(200).json(blogs);
}
