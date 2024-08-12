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
    totalResults: await extractTotalResults($),
    results: await extractSearchResults($),
  };
  return searchResponse;
};
const extractTotalPages = async ($: CheerioAPI) => {
  const totalPagesText = $(".page-last").text();
  const totalPages = totalPagesText.match(/\((\d+)\)/)?.[1];
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

  return Promise.all(searchResults);
};
export { searchSeriesService };
