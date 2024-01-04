import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createUsua,
  deleteUsua,
  getAllUsua,
  getUsua,
  updateUsua,
} from "../controllers/usuaAdmin.controller.js";

const router = Router();

router.get("/usuaAdmin", authRequired, getAllUsua);
router.get("/usuaAdmin/:id", authRequired, getUsua);
router.post("/usuaAdmin/:id", authRequired, createUsua);
router.delete("/usuaAdmin/:id", authRequired, deleteUsua);
router.put("/usuaAdmin/", authRequired, updateUsua);

export default router;
