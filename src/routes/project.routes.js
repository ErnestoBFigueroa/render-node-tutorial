import { Router } from "express";

import {
  createProjects,
  deleteProject,
  getAllProjects,
  getProject,
  updProject,
} from "../controllers/project.controller.js";

const routerProject = Router();

routerProject.get("/projects", getAllProjects);

routerProject.get("/projects/:id", getProject);

routerProject.post("/projects", createProjects);

routerProject.delete("/projects/:id", deleteProject);

routerProject.put("/projects/:id", updProject);

export default routerProject;
