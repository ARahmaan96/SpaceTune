import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { categoryId },
  } = req;

  try {
    if (req.method === "GET") {
      const response = await axios.get(
        `http://localhost:3000/categories/${categoryId}`
      );
      const categoryData = response.data;
      res.status(200).json(categoryData);
    } else {
      // Handle any other HTTP methods if needed
      res.status(405).end("Method Not Allowed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
