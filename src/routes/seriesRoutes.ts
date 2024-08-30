import { Router } from "express";
import {
  seriesInfoController,
  fieldController,
  randomSeriesController,
} from "../controllers/seriesControllers";

/**
 * Router for handling manga series information functionality.
 */
export const seriesRouter = Router();

seriesRouter.get("/random", randomSeriesController);

seriesRouter.get("/manga/:manga_id/", seriesInfoController);

seriesRouter.get("/manga/:manga_id/:field", fieldController);
