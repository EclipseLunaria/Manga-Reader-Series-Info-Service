import { Router } from "express";
import {
  seriesInfoController,
  chapterListController,
  fieldController,
} from "../controllers/seriesControllers";

/**
 * Router for handling manga series information functionality.
 */
export const seriesRouter = Router();

seriesRouter.get("/manga/:mangaId/", seriesInfoController);

seriesRouter.get("/manga/:mangaId/chapters", chapterListController);

seriesRouter.get("/manga/:mangaId/:field", fieldController);
