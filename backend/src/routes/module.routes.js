import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { createModule, getSingleCourseModule } from "../controllers/module.controller.js";

const moduleRoute = express.Router()


moduleRoute.post('/createModule', protectRoute, adminRoute, createModule)
moduleRoute.get('/getModule/:id', protectRoute, getSingleCourseModule)

export default moduleRoute