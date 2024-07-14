import { CheerioAPI } from "cheerio";
import { ParsingConfig } from "../config/parsingConfig";

/**
 * Parses the fields of a CheerioAPI object based on the provided configuration.
 * @param $ - The CheerioAPI object representing the HTML to be parsed.
 * @param config - The parsing configuration object containing functions to extract specific fields.
 * @returns A promise that resolves to an object containing the parsed fields.
 */
const parseFields = async ($: CheerioAPI, config: ParsingConfig) => {
  const seriesInfo: { [key: string]: any } = {};
  const parsingPromises = [];

  for (const [key, func] of Object.entries(config)) {
    const result = await func($);
    seriesInfo[key] = result;
    parsingPromises.push(seriesInfo[key]);
  }
  await Promise.all(parsingPromises);

  return seriesInfo;
};

export { parseFields };
