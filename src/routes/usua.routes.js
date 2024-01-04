import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/usua.controllers.js";
import { authRequired } from "../middlewares/validateToken.js"; // Nodejs React Mongodb Login y CRUD (Aplicación FullStack) (1 h 06 min)
//https://www.youtube.com/watch?v=NmkY4JgS21A&t=655s

const router = Router();

router.post("/login", login);

router.post("/Register", register);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

export default router;
