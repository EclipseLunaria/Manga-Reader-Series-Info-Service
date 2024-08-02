import { Router } from "express";
import {
  parseChapterListController,
  parseSeriesInfoController,
} from "../controllers/seriesControllers";

/**
 * Router for handling manga series information functionality.
 */
export const seriesRouter = Router();

seriesRouter.get("/manga/:mangaId/", parseSeriesInfoController);

seriesRouter.get("/manga/:mangaId/chapters", parseChapterListController);
