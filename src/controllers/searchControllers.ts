import { load } from "cheerio";
import { Request, Response } from "express";
import { searchResultConfig } from "../config/parsingConfig";
import { parseFields } from "../services/parsing";
import { extractPageHtml, parsePageNumber } from "../utils";
import { searchSeriesService } from "../services/search";
export const findSeries = async (req: Request, res: Response) => {
  const page =
    req.query.page && parseInt(req.query.page.toString()) > 0
      ? parseInt(req.query.page.toString())
      : 1;
  if (!req.query.q) {
    return res.status(400).json({ error: "Search term is required" });
  }
  const searchTerm: string = req.query.q.toString();
  const seriesUrl = `https://manganato.com/search/story/${searchTerm
    .replace(/ /g, "_")
    .toLowerCase()}?page=${page}`;
  const $ = await extractPageHtml(seriesUrl);
  if (!$) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
  const searchResults = $(".search-story-item")
    .toArray()
    .map((element$) => parseFields(load(element$), searchResultConfig));

  const resolvedResults = await Promise.all(searchResults);
  res.status(200).json(resolvedResults);
};

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
