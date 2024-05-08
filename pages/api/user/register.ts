// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { promises as fs } from "fs";
import path from "path";
import _fs from "fs";
import { v4 as uuid } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  name: string;
};

type Error = {
  error: String;
  message: String;
};

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error | any>
) {
  // Checking For Request Method
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
      message: "Only POST method are allowed",
    });
  }

  const form = formidable();

  try {
    const [fields, files] = await form.parse(req);
    console.log("files", files);
    const imageFile = files?.image![0]; // .file![0]; // nead validation
    console.log("imageFile", imageFile);
    if (!imageFile || !imageFile.filepath)
      return res.status(400).json({ error: "error", message: "No data" });

    const uplodeDir = path.join(process.cwd(), "public", "uplodes");

    // create the uplode directory if it dose't exist
    await fs.mkdir(uplodeDir, { recursive: true });

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // use uuid ;)
    const newFileName = `${uniqueSuffix}-${imageFile.originalFilename}`;
    const newFilePath = `${uplodeDir}/${newFileName}`;

    // move from temp to uplode dir
    await fs.copyFile(imageFile.filepath, newFilePath);
    console.log("uploded image", newFilePath);

    // save data to json file
    const filePath = path.join(process.cwd(), "db", "users.json");
    const jsonData: any = JSON.parse(_fs.readFileSync(filePath).toString());

    /**
     * 
     * "id": "5",
    "name": "Sophia Lee",
    "age": 28,
    "email": "sophia@example.com",
    "password": "123",
    "type": "user"
     */
    // Add a new user to the JSON data
    const newUser = {
      id: uuid(),
      name: `${fields?.firstName?.[0] || ""} ${fields?.lastName?.[0] || ""}`,
      email: fields?.email?.[0] || "",
      password: fields?.password?.[0] || "",
      image: `/uplodes/${newFileName}`,
      type: "user",
    };
    jsonData.push(newUser);

    // Write the updated JSON data back to the file
    _fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    res.status(200).json({
      message: "Image Uploded Successfully",
      imageUrl: `/uplodes/${newFileName}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to uplode" });
  }
}
