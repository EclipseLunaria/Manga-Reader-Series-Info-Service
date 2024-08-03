import { extractPageHtml, getMangaUrl } from "../utils";
import { Request, Response } from "express";
import { parseField, parseFields } from "../services/parsingServices";
import { seriesParsingConfig } from "../config/parsingConfig";

/**
 * Parses the series information using the mangaId parameter from the request.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The parsed series information or an error response.
 */
const seriesInfoController = async (req: Request, res: Response) => {
  const { mangaId } = req.params;
  const seriesUrl = getMangaUrl(mangaId);

  try {
    const $ = await extractPageHtml(seriesUrl);
    if (!$) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const seriesInfo = {
      mangaId: mangaId,
      ...(await parseFields($, seriesParsingConfig)),
    };
    res.status(200).json(seriesInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return res;
  }
};

const fieldController = async (req: Request, res: Response) => {
  const { mangaId, field } = req.params;
  const seriesUrl = getMangaUrl(mangaId);
  try {
    const $ = await extractPageHtml(seriesUrl);
    if (!$) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    const seriesInfo = await parseField($, seriesParsingConfig, field);
    if (!seriesInfo) {
      res.status(404).json({ error: "Field not found" });
    }
    res.status(200).json(seriesInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return res;
  }
};

export { seriesInfoController, fieldController };
