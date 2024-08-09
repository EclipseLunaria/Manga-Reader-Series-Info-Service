import axios from "axios";
import { load } from "cheerio";
import { Connection } from "pg";
import DB_CONFIG from "../db.config.json";

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
    return load(html);
  } catch (error: any) {
    console.log(error);
  }
};

export const getMangaUrl = (mangaId: string) =>
  `https://chapmanganato.to/manga-${mangaId}`;

const createConnection = async () => {
  const connection = new Connection({
    user: DB_CONFIG.DB_USER,
    host: DB_CONFIG.DB_HOST,
    database: DB_CONFIG.DB_NAME,
    password: DB_CONFIG.DB_PASS,
  });
  return connection;
};

const closeConnection = async (connection: Connection) => {
  connection.end();
};
