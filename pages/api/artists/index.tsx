import artists from "@/db/artists.json";
import fs from "fs";
import path from "path";

export default async function handler(req: any, res: any) {
  try {
    if (req.method === "GET") {
      res.status(200).json(artists);
    } else if (req.method === "POST") {
      const newArtist = req.body;
      console.log(newArtist);

      artists.push(newArtist);
      saveTracksToJSON();
      res.status(200).json();
    } else {
      res.status(405).json({ message: "Method not allowed!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

function saveTracksToJSON() {
  const filePath = path.resolve(__dirname, "../../../../db/artists.json");
  fs.writeFileSync(filePath, JSON.stringify(artists, null, 2));
}
