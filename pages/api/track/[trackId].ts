// pages/api/[id].js

import axios from "axios";

export default async function handler(req: any, res: any) {
  const { trackId } = req.query;
  //   console.log('Request:', trackId);

  try {
    // const response = await axios.get(`http://localhost:3000/tracks`);
    // const allTracks = response.data;
    // const track = allTracks.find((t: any) => t.id.toString() === trackId.toString());
    // console.log('Response:', track);
    // res.status(200).json(track);
    res.status(200).end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
