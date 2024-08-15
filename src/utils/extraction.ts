import axios from "axios";
import { load, CheerioAPI } from "cheerio";
import { seriesParsingConfig } from "../config/parsingConfig";
import { parseFields } from "../services/parsing";
import { MangaSeriesData } from "../models/seriesModels";
import { getSeriesInfo, storeSeriesInfo } from "../services/storage";
/**
 * Extracts the HTML content of a web page using the provided URL.
 * @param url - The URL of the web page to extract HTML from.
 * @returns A Promise that resolves to a Cheerio object representing the parsed HTML.
 */
const extractPageHtml = async (url: string): Promise<CheerioAPI> => {
  let html = "";
  try {
    const response = await axios.get(url);
    html = response.data;
    return load(html);
  } catch (error: any) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

const parsePageNumber = (pageString: string) => {
  return pageString && parseInt(pageString.toString()) > 0
    ? parseInt(pageString.toString())
    : 1;
};

const getMangaUrl = (manga_id: string) =>
  `https://chapmanganato.to/manga-${manga_id}`;

const parseSeriesInfo = async (url: string) => {
  console.log("Parsing series info from: ", url);
  const manga_id = url.split("-")[1];
  const seriesPrefetched = await trySeriesPrefetch(manga_id);

  if (seriesPrefetched) {
    return seriesPrefetched;
  }

  const seriesUrl = url;
  const $ = await extractPageHtml(seriesUrl);
  if (!$) {
    throw new Error("Internal server error");
  }
  const seriesInfo = {
    manga_id: manga_id,
    ...(await parseFields($, seriesParsingConfig)),
  };
  await storeSeriesInfo(seriesInfo);
  return seriesInfo as MangaSeriesData;
};

const trySeriesPrefetch = async (manga_id: string) => {
  const seriesPrefetched = await getSeriesInfo(manga_id);
  if (seriesPrefetched) {
    console.log("Series info fetched from database", seriesPrefetched);
    return seriesPrefetched;
  }
  return null;
};

export { extractPageHtml, getMangaUrl, parsePageNumber, parseSeriesInfo };
