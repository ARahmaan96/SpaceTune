import artists from "@/db/artists.json";
import fs from "fs";
import path from "path";

export default async function handler(req: any, res: any) {
  if (req.method === "PUT") {
    const updatedArtist = req.body;
    const artistIndex = artists.findIndex(
      (artist) => artist.id === updatedArtist.id
    );
    if (artistIndex !== -1) {
      artists[artistIndex] = updatedArtist;
      saveArtistsToJSON();
      res.status(200).json();
    } else {
      res.status(404).json({ message: "Artist not found" });
    }
  }
}

function saveArtistsToJSON() {
  const filePath = path.resolve(__dirname, "../../../../../../db/artists.json");
  fs.writeFileSync(filePath, JSON.stringify(artists, null, 2));
}
