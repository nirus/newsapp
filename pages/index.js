import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/home.module.scss';
import NewsArticle from '../components/NewsArticle';
import { useState } from 'react';
import { NEW_PAGE_SIZE } from '../app-config/constants';
import SearchBar from '../components/SearchBar';
import { v4 as uuidv4 } from 'uuid';

/**
 * Home page for news feed
 * @param {*} props 
 * @returns 
 */
export default function Home(props) {

  const [ news, setNews ] = useState(props.articles);
  const [ searchTerm, setSearchTerm ] = useState('');

  const [page, setpage] = useState(NEW_PAGE_SIZE);
  
  const makeSearchRequest = (search, page)=>{   
    getNewsByQuery(search, page).then((resp)=>{      
      setSearchTerm(search);
      setNews(resp.articles);
    })
    .catch((e)=>{
      console.error('Error in fetching news : ' + e)
    })
  };

  const commonWrapper = (api)=>{
    return api.then((resp)=> resp.json()).catch((e)=>{ console.error("Error in API call: ", e) });
  }

  const getTopNews = (page)=>{
    return commonWrapper(fetch(encodeURI(`/api/news?page=${page}`)));
  }

  const getNewsByQuery = (text, page)=>{
    return commonWrapper(fetch(encodeURI(`/api/news-query?page=${page}&text=${text}`)));
  }

  /**
   * Loadmore button
   * @param {*} searchReset 
   */
  const loadMore = () => {
    (searchTerm ? getNewsByQuery(searchTerm, page + 1) : getTopNews(page + 1))
    .then((resp)=>{
      if(resp.articles.length !== 0){
        setpage(page + 1);
        setNews([...news, ...resp.articles]);
      }else{
        alert("No more news");
      }
    })
    .catch((e)=>{
      console.error("Error in LoadMore", e);
    })
  }

  /**
   * Reset the search string
   */
  const searchReset = ()=>{   
      setpage(NEW_PAGE_SIZE);
      setSearchTerm('');
      getTopNews(NEW_PAGE_SIZE)
      .then((resp)=>{
        setNews(resp.articles);
      })
      .catch((e)=>{
        console.error('Unable to clear', e);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>CondeNast News app</title>
        <meta name="description" content="news app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}> CondeNast </h1>

        <p className={styles.description}> NewsFeed using <a style={{textDecoration: 'underline'}} href="https://newsapi.org/">newsapi.org</a> </p>
        <SearchBar 
          searchText={searchTerm}
          onClick={(text)=>{
            setpage(NEW_PAGE_SIZE);
            makeSearchRequest(text, NEW_PAGE_SIZE);
          }} 
        />

       {searchTerm ? <div className={styles.searchHint}> Search - {searchTerm} <button aria-label="clear search" onClick={()=>{
        searchReset();
       }}>&#10005;</button></div>: <></>}

        <div className={styles.grid}>
          {news.map((articles, index)=>{
            return (<NewsArticle key={uuidv4()} className={styles.card} title={articles.title} url={articles.url} image={articles.urlToImage} description={articles.description} />)
          })}
        </div>
        <button className={styles.loadMore} onClick={()=> loadMore()}>Load More</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nirus.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Niranjan Kumar
        </a>
      </footer>
    </div>
  )
}

/**
 * Serverside rendering for SEO
 * @param {*} context 
 * @returns 
 */
export async function getStaticProps(context) {
  const { getTopNews } = require('./api/news');
  const news = await getTopNews();
  
  if (!news) {
    return {
      notFound: true,
    }
  }
  return {
    props: { articles: news.articles }, // will be passed to the page component as props
  }
}