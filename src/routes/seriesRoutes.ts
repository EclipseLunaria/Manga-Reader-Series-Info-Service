import { Router } from "express";
import { parseSeriesInfoController } from "../controllers/seriesControllers";

export const seriesRouter = Router();

seriesRouter.get("/manga-:mangaId/", parseSeriesInfoController);
