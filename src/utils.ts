import axios from "axios";
import cheerio from "cheerio";

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
