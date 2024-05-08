import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { artistId },
  } = req;

  try {
    if (req.method === "GET") {
      const response = await axios.get(
        `http://localhost:3000/Artists/${artistId}`
      );
      const artistData = response.data;
      res.status(200).json(artistData);
    } else {
      // Handle any other HTTP methods if needed
      res.status(405).end("Method Not Allowed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
