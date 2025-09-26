import fs from "fs/promises";
import { nanoid } from "nanoid";

const usersFile = "users.json";

class UsersServices {
  async findUser(email, password) {
    const readFile = await fs.readFile(usersFile, "utf8");

    const parsedFile = JSON.parse(readFile);

    const foundUser = parsedFile.find((user) => user.email === email);

    return foundUser;
  }

  async registerUser(firstName, email, password) {
    const readFile = await fs.readFile(usersFile, "utf8");

    const parsedFile = JSON.parse(readFile);

    parsedFile.push({
      id: nanoid(),
      firstName,
      email,
      password,
    });

    const resultData = JSON.stringify(parsedFile);

    await fs.writeFile(usersFile, resultData);

    return "Зареган";
  }
}

export default new UsersServices();
