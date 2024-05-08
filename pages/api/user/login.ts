/**
 * Author: A.Rahman Khallaf
 * Date: 5/2024
 */

import type { NextApiRequest, NextApiResponse } from "next";
import users from "@/db/users.json";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type Data = {
  name: string;
};

type Error = {
  error: String;
  message: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  return res.status(404).end();
  // Handel Tow Types
  // 1- Only NextAuth Check if NextAuth Email in the body
  // 2- Email And Password in Body

  // Checking For Request Method
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Only POST method are allowed",
    });
  }

  // Checking if the user logged in in next-auth
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "You are not authorized to access this resource",
    });
  }

  // Checking if the user exist in the saved users
  const { email } = session?.user!;
  users.some;

  // Parse the JSON body if it exists
  const body = req.body;
  console.log(body); // Do whatever you want with the body

  res.status(404).json({ name: "John Doe" });
}
