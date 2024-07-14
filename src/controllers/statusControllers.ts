import { Request, Response } from "express";

/**
 * 
 * @param req Request object from express
 * @param res Response object from express
 * @returns returns the current status of the microservice
 */
const sendStatus = (req: Request, res: Response) => res.send("OK");

export { sendStatus };
