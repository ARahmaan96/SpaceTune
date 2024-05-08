import catrgories from "@/db/categories.json";
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
      const category = catrgories.find((cat) => cat.id === categoryId);
      res.status(200).json(category);
    } else {
      res.status(405).end("Method Not Allowed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
