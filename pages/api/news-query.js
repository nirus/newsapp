// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    BASE_URL,
    COUNTRY_ISO_CODE,
    API_KEY,
    NEW_PAGE_SIZE
} from '../../app-config/constants';

/**
 * Gets new by Query
 * @param {*} text 
 * @param {*} page 
 * @returns 
 */
export async function getNewsByQuery(text, page) {
    const news = fetch(`${BASE_URL}/everything?q=${text}&page=${page || NEW_PAGE_SIZE}&apiKey=${API_KEY}`);
    return (await news).json();
}

/* 
 * Expose as an API
 * @param {*} req 
 * @param {*} res 
 */
export default function handler(req, res) {    
    const { page, text } = req.query;
    getNewsByQuery(text, page)
        .then((news) => {
            res.status(200).json({
                ...news
            });
        }).catch((e) => {
            console.error("Error: ", e);
            res.status(400).json(...e);
        });
}