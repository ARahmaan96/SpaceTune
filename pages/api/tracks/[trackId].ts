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
    } else if (req.method === "DELETE") {
      const index = tracks.findIndex((trk) => trk.id === trackId);
      if (index !== -1) {
        tracks.splice(index, 1);
        res.status(200).json({ message: "Track deleted successfully" });
      } else {
        res.status(404).json({ message: "Track not found" });
      }
    } else {
      res.status(405).end("Method Not Allowed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
