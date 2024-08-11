import { extractPageHtml } from "../utils";
import { parseFields } from "./parsing";
import { seriesParsingConfig } from "../config/parsingConfig";
const searchSeries = async (page: number, searchTerm: string) => {
    const seriesUrl = `https://manganato.com/search/story/${searchTerm
        .replace(/ /g, "_")
        .toLowerCase()}?page=${page}`;
    const $ = await extractPageHtml(seriesUrl);
    if (!$) {
        throw new Error("Internal server error");
    }
    const searchResults = $(".search-story-item")
        .toArray()
        .map((element$) => {
            const imageHref = $(element$).find(".item-img").attr("href");
            if (!imageHref) {
                return;
            }
            return parseSeriesInfo(imageHref);
        });

    const resolvedResults = await Promise.all(searchResults);
    return resolvedResults;
}

export { searchSeries };
// parse series info
const parseSeriesInfo = async (url: string) => {
    console.log("Parsing series info from: ", url);
    const seriesUrl = url;
    const $ = await extractPageHtml(seriesUrl);
    if (!$) {
        throw new Error("Internal server error");
    }
    const seriesInfo = parseFields($, seriesParsingConfig);
    return seriesInfo;
}

//     const page =
//     req.query.page && parseInt(req.query.page.toString()) > 0
//       ? parseInt(req.query.page.toString())
//       : 1;
//   if (!req.query.q) {
//     return res.status(400).json({ error: "Search term is required" });
//   }
//   const searchTerm: string = req.query.q.toString();
//   const seriesUrl = `https://manganato.com/search/story/${searchTerm
//     .replace(/ /g, "_")
//     .toLowerCase()}?page=${page}`;
//   const $ = await extractPageHtml(seriesUrl);
//   if (!$) {
//     res.status(500).json({ error: "Internal server error" });
//     return;
//   }
//   const searchResults = $(".search-story-item")
//     .toArray()
//     .map((element$) => parseFields(load(element$), searchResultConfig));

//   const resolvedResults = await Promise.all(searchResults);
//   res.status(200).json(resolvedResults);
