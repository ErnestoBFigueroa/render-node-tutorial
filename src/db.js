import pg from "pg";
import { config } from "dotenv";

config();

const pool = new pg.Pool({
  //connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  //ssl: true,
});

export default pool;
