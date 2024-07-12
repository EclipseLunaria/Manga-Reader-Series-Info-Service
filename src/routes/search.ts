import axios from "axios";
import { Router } from "express";
import cheerio from "cheerio";

export const searchRouter = Router();

interface MangaSearchResult {
    title: string;
    link: string;
    image: string;
    rating: string;
    description: string;

}
searchRouter.get('/', (req, res) => {
    if (!req.query.term) {
        return res.status(400).json({ error: 'Search term is required' });
    }
    const searchTerm :string   = req.query.term.toString();
    
    try{
        const results = axios.get("https://manganato.com/search/story/" + searchTerm.replace(" ", "_"))
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const mangaList : MangaSearchResult[] = [];
            $(".search-story-item").each((index, element) => {
                const manga = {
                    title: $(element).find(".item-right").find("h3").text().trim() ?? '',
                    link: $(element).find(".item-right").find("a").attr("href") ?? '',
                    image: $(element).find(".item-img").find("img").attr("src") ?? '',
                    author: $(element).find(".item-right").find(".item-author").text() ?? '',
                    rating: $(element).find(".item-rate").text()??'',
                    description: $(element).find(".item-right").find(".item-summary").text()
                }
                mangaList.push(manga);
            });
            res.status(200).json(mangaList);
            return res;

        })
        

    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

});