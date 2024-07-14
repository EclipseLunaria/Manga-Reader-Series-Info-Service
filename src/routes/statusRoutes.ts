import { Router } from "express";
import { sendStatus } from "../controllers/statusControllers";

const statusRouter = Router();

statusRouter.get("/", sendStatus);

export { statusRouter };
