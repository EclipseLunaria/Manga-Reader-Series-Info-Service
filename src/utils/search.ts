import { CheerioAPI } from "cheerio";
import { parseSeriesInfo } from "../utils";
import { SearchCategory } from "../types";

const getSearchUrl = (type: SearchCategory, page: number) => {
  switch (type) {
    case "last_updated":
      console.log(page);
      return `https://manganato.com/genre-all/${page}`;
    case "popular":
      return `https://manganato.com/genre-all/${page}?type=topview`;
    case "newest":
      return `https://manganato.com/genre-all/${page}?type=newest`;
    default:
      return `https://manganato.com/genre-all/${page}`;
  }
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
  console.log(totalResults);
  return totalResults ? parseInt(totalResults) : -1;
};
const extractSearchResults = async (
  $: CheerioAPI,
  containerClass?: string,
  imageClass?: string
) => {
  console.log("Extracting search results");
  console.log(containerClass, imageClass);
  const searchResults = $(
    containerClass ? containerClass : ".search-story-item"
  )
    .toArray()
    .map(async (element$) => {
      const imageHref = $(element$)
        .find(imageClass ? imageClass : ".item-img")
        .attr("href");
      if (!imageHref) {
        return {};
      }
      return await parseSeriesInfo(imageHref);
    });

  return Promise.all(searchResults);
};

export {
  getSearchUrl,
  extractTotalPages,
  extractTotalResults,
  extractSearchResults,
};
