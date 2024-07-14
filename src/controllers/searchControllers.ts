import { load } from "cheerio";
import { Request, Response } from "express";

import { searchResultConfig } from "../config/parsingConfig";
import { parseFields } from "../services/parsingServices";
import { extractPageHtml } from "../utils";

/**
 * Finds series based on the search term provided in the request query.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response with the search results or an error response.
 */
export const findSeries = async (req: Request, res: Response) => {
  if (!req.query.term) {
    return res.status(400).json({ error: "Search term is required" });
  }
  const searchTerm: string = req.query.term.toString();
  const seriesUrl = `https://manganato.com/search/story/${searchTerm
    .replace(/ /g, "_")
    .toLowerCase()}`;
  console.log(seriesUrl);
  const $ = await extractPageHtml(seriesUrl);
  if (!$) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  let searchResults: any[] = [];
  for (const element$ of $(".search-story-item").toArray()) {
    const result = await parseFields(load(element$), searchResultConfig);
    searchResults.push(result);
  }
  res.status(200).json(searchResults);
  return;
};
