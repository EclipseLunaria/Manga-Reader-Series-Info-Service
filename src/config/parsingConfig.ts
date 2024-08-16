import { CheerioAPI } from "cheerio";

export type ParsingFunction = ($: CheerioAPI) => any;

export interface ParsingConfig {
  [key: string]: ParsingFunction;
}

const seriesParsingConfig: ParsingConfig = {
  title: ($) => $(".story-info-right").find("h1").text().trim(),
  author: ($) =>
    $("td.table-label:has(.info-author)")
      .next("td.table-value")
      .find("a")
      .toArray()
      .map((elem) => $(elem).text())
      .join(", "),
  image: ($) => $(".info-image").find("img").attr("src") ?? "",
  rating: ($) => ({
    ratingAvg: $("em[property='v:average']").text(),
    totalVotes: $("em[property='v:votes']").text(),
  }),
  description: ($) =>
    $(".panel-story-info-description")
      .text()
      .replace("Description :", "")
      .trim(),
  status: ($) =>
    $("td.table-label:has(.info-status)").next("td.table-value").text().trim(),
  genres: ($) =>
    $('td.table-label:contains("Genres :")')
      .next("td.table-value")
      .find("a")
      .map((i, elem) => $(elem).text())
      .get(),
  chapters: ($) =>
    $(".row-content-chapter")
      .find("li")
      .map((i, elem) => ({
        chapter_id: $(elem)
          .find("a")
          .attr("href")
          ?.split("/")
          .pop()
          ?.split("chapter-")
          .pop(),
        title: $(elem).find("a").text(),
        link: $(elem).find("a").attr("href"),
        // MAYBE: Add date
      }))
      .get()
      .reverse(),
  totalChapters: ($) => $(".row-content-chapter").find("li").get().length,
};

const searchResultConfig: ParsingConfig = {
  title: ($) => $(".item-right").find("h3").text().trim(),
  link: ($) => $(".item-right a").attr("href"),
  image: ($) => $(".item-img img").attr("src"),
  author: ($) => $(".item-right .item-author").text(),
  rating: ($) => $(".item-rate").text(),
  description: ($) => $(".item-right .item-summary").text(),
  seriesId: ($) => $(".item-right a").attr("href")?.split("-")[1],
};

export { seriesParsingConfig, searchResultConfig };
