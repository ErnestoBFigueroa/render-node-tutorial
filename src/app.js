import express from "express";
import { config } from "dotenv"; // Despliegue de Nodejs en Render.com (con PostgreSQL)
// https://www.youtube.com/watch?v=-KEJ8_yvy0Q&t=30s
import pg from "pg"; // React, Node y PostgreSQL (PERN Stack) con Material UI
// https://www.youtube.com/watch?v=_zGL_MU29zs&t=5630s
import cors from "cors";

import morgan from "morgan";
import routerUsua from "./routes/usua.routes.js";
// Fazt code Nodejs React Mongodb Login y CRUD (Aplicación FullStack)
// https://www.youtube.com/watch?v=NmkY4JgS21A&t=655s
import routerProject from "./routes/project.routes.js";
import cookieParser from "cookie-parser";
// Fazt code Nodejs React Mongodb Login y CRUD (Aplicación FullStack) 1 h 05 min
// https://www.youtube.com/watch?v=NmkY4JgS21A&t=655s

config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const whiteList = [process.env.FRONTEND_URL];

const pool = new pg.Pool({
  //connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  //ssl: true,
});

app.use(
  cors({
    origin: whiteList,
  })
);

app.use("/api", routerUsua);
app.use(routerProject);
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.post("/api/login", async (req, res) => {
//   const usua = req.usua;
//   const pass = req.pass;
//   const sistema = req.empresa;

//   const values = [usua, pass, sistema];
//   const text =
//     "SELECT TOP 1 sistema,usua,perfil FROM public.usuarios WHERE usua=$1 AND pass=$2 and empresa=$3";

//   //const result = await pool.query(text, values);

//   const user = {
//     id: 1,
//     nombre: "Ernesto",
//     email: "efigueroa@hotmail.com",
//   };

//   jwt.sign({ user: user }, "secretkey", { expiresIn: "1h" }, (err, token) => {
//     res.json({
//       token: token,
//     });
//   });
//   //res.json(result);
//   // res.json(user);
// });

// app.post("/api/posts", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (error, authData) => {
//     if (error) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         mensaje: "Post fue creado",
//         authData: authData,
//       });
//     }
//   });
// });

// // Authorization: Bearer <token>
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];

//   if (typeof bearerHeader !== "undefined") {
//     const bearerToken = bearerHeader.split(" ")[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

export default app;
