import users from "@/db/users.json";
import formidable from "formidable";
import { promises as fs } from "fs";
import path from "path";
import _fs from "fs";

export default async function handler(req: any, res: any) {
  if (req.method !== "PUT")
    res.status(403).json({ message: "Methoud Not Allowed!" });

  console.log("kk");

  const form = formidable();

  try {
    const [fields, files] = await form.parse(req);

    console.log("files", files);

    const imageFile = files?.image![0]; // .file![0]; // nead validation

    console.log("imageFile", imageFile);

    if (!imageFile || !imageFile.filepath)
      return res.status(400).json({ error: "error", message: "No data" });

    const uplodeDir = path.join(process.cwd(), "public", "uplodes");

    console.log(uplodeDir);

    // create the uplode directory if it dose't exist
    await fs.mkdir(uplodeDir, { recursive: true });

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // use uuid ;)
    const newFileName = `${uniqueSuffix}-${imageFile.originalFilename}`;
    const newFilePath = `${uplodeDir}/${newFileName}`;

    // move from temp to uplode dir
    await fs.copyFile(imageFile.filepath, newFilePath);
    console.log("uploded image", newFilePath);

    // Update user data
    const userIndex = users.findIndex(
      (user) => user.email == fields?.email?.[0]
    );
    if (userIndex === -1) {
      return res.status(404).json({
        error: "User not found",
        message: "No user with the provided email found",
      });
    }

    console.log(userIndex);

    // Update user's image field
    users[userIndex].image = `/uploads/${newFilePath}`;

    // Save updated user data to JSON file
    saveUsersToJSON();

    return res.status(200).json({
      message: "User image updated successfully",
      imageUrl: `/uploads/${newFilePath}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Faild to uplode" });
  }
}

function saveUsersToJSON() {
  const filePath = path.resolve(__dirname, "@/db/users.json");
  _fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
