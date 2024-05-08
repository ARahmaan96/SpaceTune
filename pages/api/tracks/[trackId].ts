import tracks from "@/db/tracks.json";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { trackId },
  } = req;

  try {
    if (req.method === "GET") {
      const track = tracks.find((trk) => trk.id === trackId);
      console.log(track);
      res.status(200).json(track);
    } else {
      res.status(405).end("Method Not Allowed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
