import { Router } from "express";
import { findSeries } from "../controllers/searchControllers";

/**
 * Router for handling manga series search functionality.
 */
export const searchRouter = Router();

searchRouter.get("/", findSeries);
