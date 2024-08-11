import { Router } from "express";
import { findSeries, newSearchSeries } from "../controllers/searchControllers";

export const searchRouter = Router();

searchRouter.get("/", findSeries);

searchRouter.get("/new", newSearchSeries);