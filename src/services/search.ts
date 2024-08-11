import { CheerioAPI } from "cheerio";
import { extractPageHtml, parseSeriesInfo } from "../utils";
import { MangaSearchResponse } from "../models/searchModels";

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
    results: await extractSearchResults($),
    totalResults: await extractTotalResults($),
  };
  return searchResponse;
};
const extractTotalPages = async ($: CheerioAPI) => {
  const totalPages = $(".page-last").text();
  return totalPages ? parseInt(totalPages) : 1;
};

const extractTotalResults = async ($: CheerioAPI) => {
  const totalResults = $(".group-qty")
    .text()
    .split(" ")
    .pop()
    ?.replace(/,/g, "");
  return totalResults ? parseInt(totalResults) : -1;
};
const extractSearchResults = async ($: CheerioAPI) => {
  const searchResults = $(".search-story-item")
    .toArray()
    .map(async (element$) => {
      const imageHref = $(element$).find(".item-img").attr("href");
      if (!imageHref) {
        return {};
      }
      return await parseSeriesInfo(imageHref);
    });

  return searchResults;
};
export { searchSeriesService };
