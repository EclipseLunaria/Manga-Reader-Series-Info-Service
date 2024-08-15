import { Router } from "express";
import {
  newSearchSeries as searchSeries,
  newestSeries,
  popularSeries,
  latestSeries,
} from "../controllers/searchControllers";

export const searchRouter = Router();

searchRouter.get("/search", searchSeries);

searchRouter.get("/latest/updated", latestSeries);

searchRouter.get("/latest/added", newestSeries);

searchRouter.get("/most/popular", popularSeries);
