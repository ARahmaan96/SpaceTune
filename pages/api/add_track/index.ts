import axios from "axios";

export default async function handler(req: any, res: any) {
  try {
    if (req.method === "GET") {
      const response = await axios.get("http://localhost:3001/tracks");
      const allData = response.data;
      res.status(200).json(allData);
    } else if (req.method === "POST") {
      const newTrack = req.body;
      await axios.post("http://localhost:3001/tracks", newTrack);
      res.status(200).json();
      // Handle POST request if needed
    } else {
      res.status(405).json({ message: "Method not allowed!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
