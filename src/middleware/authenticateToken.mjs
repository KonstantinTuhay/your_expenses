import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) res.status(401).send("Unauthorized");
    jwt.verify(token, process.env.SECRET_KEY, (err, id) => {
      if (err) next(new Error("invalid token"));
      req.userId = id;
      next();
    });
  } catch (error) {
    res.status(403).send("Forbidden");
  }
};
