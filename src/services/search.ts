import { extractPageHtml } from "../utils";
import { MangaSearchResponse } from "../models/searchModels";
import {
  extractTotalPages,
  extractTotalResults,
  extractSearchResults,
  getSearchUrl,
} from "../utils/search";
import { SearchCategory } from "../types";

const searchSeriesService = async (page: number, searchTerm: string) => {
  const seriesUrl = `https://manganato.com/search/story/${searchTerm
    .replace(/ /g, "_")
    .toLowerCase()}?page=${page}`;
  const $ = await extractPageHtml(seriesUrl);
  if (!$) {
    throw new Error("Internal server error");
  }
  const searchResponse: MangaSearchResponse = {
    page: page,
    totalPages: await extractTotalPages($),
    totalResults: await extractTotalResults($),
    results: await extractSearchResults($),
  };
  return searchResponse;
};

const latestSeriesService = async (page: number, type: SearchCategory) => {
  const seriesUrl = getSearchUrl(type, page);
  console.log(seriesUrl);
  const $ = await extractPageHtml(seriesUrl);
  if (!$) {
    throw new Error("Internal server error");
  }
  const searchResponse: MangaSearchResponse = {
    page: page,
    totalPages: await extractTotalPages($),
    totalResults: await extractTotalResults($),
    results: await extractSearchResults(
      $,
      ".content-genres-item",
      ".genres-item-img"
    ),
  };
  return searchResponse;
};
export { searchSeriesService, latestSeriesService };
