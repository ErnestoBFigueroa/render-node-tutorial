import { Router } from "express";
import {
  createUsua,
  deleteUsua,
  getAllUsua,
  getUsua,
  login,
  logout,
  profile,
  register,
  updateUsua,
} from "../controllers/usua.controllers.js";
import { authRequired } from "../middlewares/validateToken.js"; // Nodejs React Mongodb Login y CRUD (Aplicación FullStack) (1 h 06 min)
//https://www.youtube.com/watch?v=NmkY4JgS21A&t=655s

const router = Router();

router.post("/login", login);

router.post("/Register", register);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

router.get("/usua", getAllUsua);

router.get("/usua/10", getUsua);

router.post("/usua", createUsua);

router.delete("/usua", deleteUsua);

router.put("/usua", updateUsua);

export default router;
