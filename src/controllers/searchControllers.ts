import { load } from "cheerio";
import { Request, Response } from "express";

import { searchResultConfig } from "../config/parsingConfig";
import { parseFields } from "../services/parsing";
import { extractPageHtml } from "../utils";
import { searchSeries } from "../services/search";

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
  const page =
    req.query.page && parseInt(req.query.page.toString()) > 0
      ? parseInt(req.query.page.toString())
      : 1;
  if (!req.query.q) {
    return res.status(400).json({ error: "Search term is required" });
  }
  const searchTerm: string = req.query.q.toString();
  const searchResults = await searchSeries(page, searchTerm);
  res.status(200).json(searchResults);
}