import { extractPageHtml } from "../utils";
import { Request, Response } from "express";
import { parseFields } from "../services/parsingServices";
import { seriesParsingConfig } from "../config/parsingConfig";

/**
 * Parses the series information using the mangaId parameter from the request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The parsed series information or an error response.
 */
export const parseSeriesInfoController = async (
  req: Request,
  res: Response
) => {
  const seriesUrl = `https://chapmanganato.to/manga-${req.params.mangaId}`;

  try {
    const $ = await extractPageHtml(seriesUrl);
    if (!$) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const seriesInfo = await parseFields($, seriesParsingConfig);
    res.status(200).json(seriesInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return res;
  }
};
