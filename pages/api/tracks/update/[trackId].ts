import tracks from "@/db/tracks.json";
import fs from "fs";
import path from "path";

export default async function handler(req: any, res: any) {
  if (req.method === "PUT") {
    const updatedTrack = req.body;
    const trackIndex = tracks.findIndex(
      (track) => track.id === updatedTrack.id
    );
    if (trackIndex !== -1) {
      tracks[trackIndex] = updatedTrack;
      saveTracksToJSON();
      res.status(200).json();
    } else {
      res.status(404).json({ message: "Track not found" });
    }
  }
}

function saveTracksToJSON() {
  const filePath = path.resolve(__dirname, "../../../../../../db/tracks.json");
  fs.writeFileSync(filePath, JSON.stringify(tracks, null, 2));
}
