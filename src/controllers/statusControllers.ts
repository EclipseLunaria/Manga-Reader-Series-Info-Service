import { Request, Response } from "express";

const sendStatus = (req: Request, res: Response) => res.send("OK");

export { sendStatus };
