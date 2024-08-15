import { Router } from "express";
import {
  findSeries,
  latestSeries,
  newSearchSeries,
} from "../controllers/searchControllers";

export const searchRouter = Router();

// searchRouter.get("/", findSeries);

searchRouter.get("/search", newSearchSeries);

searchRouter.get("/latest/update", latestSeries);

searchRouter.get("/latest/added");
