import { Router } from "express";
import { findSeries } from "../controllers/searchControllers";

export const searchRouter = Router();

searchRouter.get("/", findSeries);
