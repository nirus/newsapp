// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    BASE_URL,
    COUNTRY_ISO_CODE,
    API_KEY,
    NEW_PAGE_SIZE
} from '../../app-config/constants';

/**
 * Expose to get intialProps
 * @returns 
 */
export async function getTopNews(page) {
    const news = fetch(`${BASE_URL}/top-headlines?country=${COUNTRY_ISO_CODE}&page=${page || NEW_PAGE_SIZE}&apiKey=${API_KEY}`);
    return (await news).json();
}


/**
 * Expose as an API
 * @param {*} req 
 * @param {*} res 
 */
export default function handler(req, res) {
    const { page } = req.query;
    getTopNews(page)
        .then((news) => {
            res.status(200).json({
                ...news
            });
        }).catch((e) => {
            console.error("Error: ", e);
            res.status(400).json(...e);
        });
}