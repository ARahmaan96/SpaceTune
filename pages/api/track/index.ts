import axios from "axios";
import tracks from "@/db/tracks.json";

export default async function handler(req: any, res: any) {
  try {
    if (req.method === "GET") {
      res.status(200).json(tracks);
    } else if (req.method === "POST") {
      const newTrack = req.body;
      await axios.post("http://localhost:3000/tracks", newTrack);
      res.status(200).json();
    } else if (req.method === "PUT") {
      const newTrack = req.body;
      await axios.put("http://localhost:3000/tracks", newTrack);
      res.status(200).json();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
