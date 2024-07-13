import { CheerioAPI } from "cheerio";

export type ParsingFunction = ($: CheerioAPI) => any;
interface ParsingConfig {
  [key: string]: ParsingFunction;
}

const seriesParsingConfig: ParsingConfig = {
  title: ($) => $(".story-info-right").find("h1").text().trim(),
  author: ($) =>
    $("td.table-label:has(.info-author)")
      .next("td.table-value")
      .find("a")
      .text()
      .trim(),
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
        title: $(elem).find("a").text(),
        link: $(elem).find("a").attr("href"),
      }))
      .get()
      .reverse(),
  totalChapters: ($) => $(".row-content-chapter").find("li").get().length,
};

export { seriesParsingConfig };