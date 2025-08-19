import React, {useEffect, useState} from 'react';
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";


const News = (props) => {
    const api = process.env.REACT_APP_NEWS_API_KEY
    const [articles, setArticles] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [page, setPage] = useState(1)

    const { query, setProgress } = props;

    const getFromDate = () => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().slice(0, 10);
    }

    const buildApiUrl = (q, p) => {
        const fromDate = getFromDate();
        const today = new Date().toISOString().slice(0, 10);
        const searchQuery = q || 'Top';
        return `https://newsapi.org/v2/everything?q=${searchQuery}&from=${fromDate}&to=${today}&sortBy=popularity&apiKey=${api}&pageSize=12&page=${p}`;
    }

    useEffect(() => {
        const fetchNews = async () => {
            setProgress(10);
            const url = buildApiUrl(query, 1);
            try {
                const response = await fetch(url);
                const data = await response.json();
                setProgress(70);
                setArticles(data.articles || []);
                setTotalResults(data.totalResults || 0);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setProgress(100);
            }
        };
        fetchNews();
        setPage(1); // Reset page to 1 on new query
    }, [query, setProgress])


    const fetchMoreData = async () => {
      const nextPage = page + 1;
      const url = buildApiUrl(query, nextPage);
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.articles) {
            setArticles((prevArticles) => prevArticles.concat(data.articles));
        }
        setPage(nextPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    return (
    <div className="main">
        <div className="container">
            <h1 className="page-title">
                <span>DailyTimes</span> - {query} Headlines
            </h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner/>}
                className="news-grid"
            >
                {articles.map((e) => {
                    if (e && e.url) {
                        return (
                            <NewsItem
                                key={e.url}
                                title={e.title || ""}
                                description={
                                    e.description ? e.description.slice(0, 100) : ""
                                }
                                imageUrl={
                                    e.urlToImage || "https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg"
                                }
                                newsUrl={e.url}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </InfiniteScroll>
        </div>
    </div>
    );
};
export default News;
