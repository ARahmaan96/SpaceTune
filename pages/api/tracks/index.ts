import tracks from "@/db/tracks.json";
import fs from "fs";
import path from "path";

export default function handler(req: any, res: any) {
  try {
    if (req.method === "GET") {
      res.status(200).json(tracks);
    } else if (req.method === "POST") {
      const newTrack = req.body;
      console.log(newTrack);

      tracks.push(newTrack);
      saveTracksToJSON();
      res.status(200).json();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

function saveTracksToJSON() {
  const filePath = path.resolve(__dirname, "../../../../db/tracks.json");
  fs.writeFileSync(filePath, JSON.stringify(tracks, null, 2));
}
