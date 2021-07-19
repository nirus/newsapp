import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/home.module.scss';
import NewsArticle from '../components/NewsArticle';
import { getTopNews, getNewsByQuery } from './api/news';
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

  const [pageSize, setPageSize] = useState(NEW_PAGE_SIZE + 10);
  const makeSearchRequest = (search)=>{   
    getNewsByQuery(search).then((resp)=>{      
      setSearchTerm(search);
      setNews(resp.articles);
    })
    .catch((e)=>{
      console.error('Error in fetching news : ' + e)
    })
  };

  /**
   * Loadmore button
   * @param {*} searchReset 
   */
  const loadMore = (searchReset) => {
    (searchTerm ? getNewsByQuery(searchTerm, pageSize) : getTopNews(pageSize))
    .then((resp)=>{
      setPageSize(pageSize + 10);
      setNews(resp.articles);
    })
    .catch((e)=>{
      console.error("Error in LoadMore", e);
    })
  }

  /**
   * Reset the search string
   */
  const searchReset = ()=>{   
      setPageSize(NEW_PAGE_SIZE);
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
            makeSearchRequest(text);
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