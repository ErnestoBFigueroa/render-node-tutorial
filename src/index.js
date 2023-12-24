import express from "express";
import { config } from "dotenv";
import pg from "pg";
import cors from "cors";
import jwt from "jsonwebtoken"; //https://www.youtube.com/watch?v=cL3bXzUBFUA
import morgan from "morgan";
import router from "./routes/usua.routes.js";
import routerProject from "./routes/project.routes.js";

config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

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

app.use(router);
app.use(routerProject);
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/login", async (req, res) => {
  const usua = req.usua;
  const pass = req.pass;
  const sistema = req.empresa;

  const values = [usua, pass, sistema];
  const text =
    "SELECT sistema,usua,perfil FROM public.usuarios WHERE usua=$1 AND pass=$2 and empresa=$3";

  const result = await pool.query(text, values);

  const user = {
    id: 1,
    nombre: "Ernesto",
    email: "efigueroa@hotmail.com",
  };

  jwt.sign({ user: user }, "secretkey", { expiresIn: "1h" }, (err, token) => {
    res.json({
      token: token,
    });
  });
  //res.json(result);
  // res.json(user);
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
        mensaje: "Post fue creado",
        authData: authData,
      });
    }
  });
});

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(3000);
console.log("Server on port", 3000);
