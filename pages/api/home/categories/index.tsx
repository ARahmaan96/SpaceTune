import catrgories from "@/db/categories.json";
export default async function handler(req: any, res: any) {
  try {
    if (req.method === "GET") {
      res.status(200).json(catrgories);
    } else if (req.method === "POST") {
      // Handle POST request if needed
    } else {
      res.status(405).json({ message: "Method not allowed!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
