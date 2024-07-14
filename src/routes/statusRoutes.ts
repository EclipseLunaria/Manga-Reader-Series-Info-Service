import { Router } from "express";
import { sendStatus } from "../controllers/statusControllers";

/**
 * Router for handling microservices health and monitoring.
 */
const statusRouter = Router();

statusRouter.get("/", sendStatus);

export { statusRouter };
