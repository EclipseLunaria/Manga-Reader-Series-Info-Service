import { Router } from "express";
import { parseSeriesInfoController } from "../controllers/seriesControllers";

/**
 * Router for handling manga series information functionality.
 */
export const seriesRouter = Router();


seriesRouter.get("/manga-:mangaId/", parseSeriesInfoController);
