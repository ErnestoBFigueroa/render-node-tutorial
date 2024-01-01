import jwt from "jsonwebtoken"; // Nodejs React Mongodb Login y CRUD (Aplicación FullStack) (min 49)
//https://www.youtube.com/watch?v=NmkY4JgS21A&t=655s
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      // {
      //   id: data[0].id,
      // },
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        // res.json({ token });
        resolve(token);
      }
    );
  });
}
