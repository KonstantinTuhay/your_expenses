import UsersServices from "../helpers/usersServices.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

class UsersControllers {
  async login(req, res) {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const foundUser = await UsersServices.findUser(email, password);

      if (!foundUser) {
        return res.status(401).json({
          message: "Пользователь не найден! Неверный email или пароль",
        });
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }

      // Создание JWT-токена для авторизации
      const token = jwt.sign({ userId: foundUser.id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }

  async register(req, res) {
    const { firstName, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const foundUser = await UsersServices.findUser(email, password);
      if (foundUser) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      // Хэширование пароля
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Создание нового пользователя
      const newUser = await UsersServices.registerUser(
        firstName,
        email,
        hashedPassword
      );

      res.status(200).json({ newUser });
    } catch (error) {
      console.error("Ошибка при получении годов:", error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }
}
export default new UsersControllers();
