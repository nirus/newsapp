// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BASE_URL, COUNTRY_ISO_CODE, API_KEY, NEW_PAGE_SIZE } from '../../app-config/constants';

/**
 * Expose to get intialProps
 * @returns 
 */
export async function getTopNews(pagesize){
    const news = fetch(`${BASE_URL}/top-headlines?country=${COUNTRY_ISO_CODE}&pageSize=${pagesize || NEW_PAGE_SIZE}&apiKey=${API_KEY}`);
    return (await news).json();
}

export async function getNewsByQuery(text, pageSize){
    const news = fetch(`${BASE_URL}/everything?q=${text}&pageSize=${pageSize || NEW_PAGE_SIZE}&apiKey=${API_KEY}`);
    return (await news).json();
}
/**
 * Expose as an API
 * @param {*} req 
 * @param {*} res 
 */
export default function handler(req, res) {
    getTopNews()
    .then((news)=>{
        res.status(200).json({ ...news });
    }).catch((e)=>{
        console.error("Error: ", e);
        res.status(400).json(...e);
    });
  }
  