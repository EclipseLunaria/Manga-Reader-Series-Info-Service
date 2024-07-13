import { CheerioAPI } from "cheerio";
import { ParsingConfig } from "../config/parsingConfig";

const parseFields = async ($: CheerioAPI, config: ParsingConfig) => {
  const seriesInfo: { [key: string]: any } = {};
  const parsingPromises = [];

  for (const [key, func] of Object.entries(config)) {
    const result = await func($);
    console.log(result);
    seriesInfo[key] = result;
    parsingPromises.push(seriesInfo[key]);
  }
  await Promise.all(parsingPromises);

  return seriesInfo;
};

export { parseFields };
