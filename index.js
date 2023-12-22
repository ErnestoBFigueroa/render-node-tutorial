import express from "express";
import { config } from "dotenv";
import pg from "pg";
import cors from "cors";

config();

const app = express();
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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/projects", async (req, res) => {
  const result = await pool.query(
    "SELECT 'Adincoha' Base,* FROM public.projects ORDER BY id ASC"
  );
  return res.json(result.rows[0]);
});

app.listen(3000);
console.log("Server on port", 3000);
