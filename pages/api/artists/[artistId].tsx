import fs from "fs";
import path from "path";
import artists from "@/db/artists.json";
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
      const artistData = artists.find((art) => art.id === artistId);
      res.status(200).json(artistData);
    } else if (req.method === "DELETE") {
      const index = artists.findIndex((art) => art.id === artistId);
      if (index !== -1) {
        artists.splice(index, 1);
        saveArtistsToJSON();
        res.status(200).json({ message: "Artist deleted successfully" });
      } else {
        res.status(404).json({ message: "Artist not found" });
      }
    } else {
      res.status(405).end("Method Not Allowed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

function saveArtistsToJSON() {
  const filePath = path.resolve(__dirname, "../../../../../db/artists.json");
  fs.writeFileSync(filePath, JSON.stringify(artists, null, 2));
}
