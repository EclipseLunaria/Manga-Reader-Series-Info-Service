import axios from "axios";
import cheerio from "cheerio";

/**
 * Extracts the HTML content of a web page using the provided URL.
 * @param url - The URL of the web page to extract HTML from.
 * @returns A Promise that resolves to a Cheerio object representing the parsed HTML.
 */
export const extractPageHtml = async (url: string) => {
  let html = "";
  try {
    const response = await axios.get(url);
    html = response.data;
    return cheerio.load(html);
  } catch (error: any) {
    console.log(error);
  }
};
