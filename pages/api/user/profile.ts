import users from "@/db/users.json";
import fs from "fs";
import path from "path";

export default async function handler(req: any, res: any) {
  if (req.method === "PUT") {
    const updatedUser = req.body;

    const userIndex = users.findIndex(
      (user) => user.email === updatedUser.email
    );
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      saveUserToJSON();
      res.status(200).json();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(403).json({ message: "Methoud Not Allowed!" });
  }
}

function saveUserToJSON() {
  const filePath = path.resolve(__dirname, "../../../../../../db/artists.json");
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
