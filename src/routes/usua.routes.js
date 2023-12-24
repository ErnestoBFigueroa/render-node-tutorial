import { Router } from "express";

import {
  createUsua,
  deleteUsua,
  getAllUsua,
  getUsua,
  updateUsua,
} from "../controllers/usua.controllers.js";

const router = Router();

router.get("/usua", getAllUsua);

router.get("/usua/10", getUsua);

router.post("/usua", createUsua);

router.delete("/usua", deleteUsua);

router.put("/usua", updateUsua);

export default router;
