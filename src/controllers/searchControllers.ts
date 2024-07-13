import axios from "axios";
import { Request, Response } from "express";
import { load } from "cheerio";
import { MangaSearchResult } from "../models/searchModels";

export const findSeries = (req: Request, res: Response) => {
  if (!req.query.term) {
    return res.status(400).json({ error: "Search term is required" });
  }
  const searchTerm: string = req.query.term.toString();

  try {
    const results = axios
      .get("https://manganato.com/search/story/" + searchTerm.replace(" ", "_"))
      .then((response) => {
        const html = response.data;
        const $ = load(html);
        const mangaList: MangaSearchResult[] = [];
        $(".search-story-item").each((index, element) => {
          let manga = {
            title:
              $(element).find(".item-right").find("h3").text().trim() ?? "",
            link: $(element).find(".item-right").find("a").attr("href") ?? "",
            image: $(element).find(".item-img").find("img").attr("src") ?? "",
            author:
              $(element).find(".item-right").find(".item-author").text() ?? "",
            rating: $(element).find(".item-rate").text() ?? "",
            description: $(element)
              .find(".item-right")
              .find(".item-summary")
              .text(),
            seriesId:
              $(element)
                .find(".item-right")
                .find("a")
                .attr("href")
                ?.split("-")[1] ?? "",
          };
          console.log(manga.seriesId);

          mangaList.push(manga);
        });
        res.status(200).json(mangaList);
        return res;
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
