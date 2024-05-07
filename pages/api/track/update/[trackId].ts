import { parse } from "node:path"; // Node.js built-in path parsing

export default async function handler(req: any, res: any) {
  if (req.method === "PUT") {
    try {
      const { trackId } = req.query;
      const trackData = req.body;
      console.log("sent track data", trackData);

      const fs = require("fs");
      let db = require("../../../../db/db.json");
      //   const data = JSON.parse(fs.readFileSync("@/db.json", "utf8"));

      const path = require("path");
      const filePath = path.resolve(__dirname, "../../../../../../db/db.json");

      // Find the track to update by ID
      const trackIndex = db.tracks.findIndex(
        (track: any) => track.id.toString() === trackId.toString()
      );

      if (trackIndex !== -1) {
        // Update track data
        console.log("track data before", db.tracks[trackIndex]);
        db.tracks[trackIndex] = { ...db.tracks[trackIndex], ...trackData };
        console.log("track data after", db.tracks[trackIndex]);
        console.log("alltracks", db.tracks);

        // Write updated data back to db.json
        console.log(filePath);
        fs.writeFile(filePath, JSON.stringify(db, null, 2), (err: any) => {
          if (err) {
            console.error("Error saving movies to file:", err);
          } else {
            console.log("Movies saved to file successfully");
          }
        });

        res.status(200).json({ message: "Track updated successfully!" });
      } else {
        res.status(404).json({ message: "Track not found!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed!" });
  }
}
