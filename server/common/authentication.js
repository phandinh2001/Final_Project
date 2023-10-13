import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, "bWluZHgud2ViNjE=", (err, phone) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.phone = phone;
      next();
    });
  };