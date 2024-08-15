import { Request, Response } from "express";
import { parsePageNumber } from "../utils";
import { latestSeriesService, searchSeriesService } from "../services/search";
import { SearchCategory } from "../types";

export const newSearchSeries = async (req: Request, res: Response) => {
  const page = parsePageNumber(req.query.page as string) || 1;
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required" });
  }
  try {
    const searchResponse = await searchSeriesService(
      page,
      searchTerm.toString()
    );
    res.status(200).json(searchResponse);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const getSeriesByType =
  (type: SearchCategory) => async (req: Request, res: Response) => {
    const page = parsePageNumber(req.query.page as string) || 1;

    try {
      const searchResponse = await latestSeriesService(page, type);
      res.status(200).json(searchResponse);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

export const latestSeries = getSeriesByType("last_updated");
export const popularSeries = getSeriesByType("popular");
export const newestSeries = getSeriesByType("newest");
