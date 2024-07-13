import { CheerioAPI } from "cheerio";
import { seriesParsingConfig } from "../config/parsingConfig";

const parseSeriesInfo = async ($: CheerioAPI) => {
  const seriesInfo: { [key: string]: any } = {};
  const parsingPromises = [];

  for (const [key, func] of Object.entries(seriesParsingConfig)) {
    const result = await func($);
    console.log(result);
    seriesInfo[key] = result;
    parsingPromises.push(seriesInfo[key]);
  }
  await Promise.all(parsingPromises);

  return seriesInfo;
};

export { parseSeriesInfo };
