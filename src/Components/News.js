import React, {useEffect, useState} from 'react';
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";


const News = (props) => {
    const cardStyle=props.cardStyle
    const api = process.env.REACT_APP_NEWS_API_KEY
    const article = []
    const [articles, setArticles] = useState(article)
    const [totalResults, setTotalResults] = useState(0)
    const [page, setPage] = useState(1)

    let query = props.query;

    const getFromDate = () => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().slice(0, 10);
    }

    const buildApiUrl = (q, p) => {
        const fromDate = getFromDate();
        const today = new Date().toISOString().slice(0, 10);
        const searchQuery = q || 'Top';
        return `https://newsapi.org/v2/everything?q=${searchQuery}&from=${fromDate}&to=${today}&sortBy=popularity&apiKey=${api}&pageSize=10&page=${p}`;
    }

    useEffect(() => {
        const url = buildApiUrl(query, 1);
        props.setProgress(10)
        fetch(url)
            .then(data => data.json())
            .then(data => {
                props.setProgress(30)
                setArticles(data.articles);
                setTotalResults(data.totalResults);
                props.setProgress(100);
            }).catch(error => {
                console.error("Error fetching data:", error);
                props.setProgress(100);
            });

    }, [query])


const fetchMoreData = async () => {
  const nextPage = page + 1;
  const url = buildApiUrl(query, nextPage);
  try {
    const response = await fetch(url);
    const data = await response.json();
    setArticles((prevArticles) => prevArticles.concat(data.articles));
    setTotalResults(data.totalResults);
    setPage(nextPage);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


    return (<div className="main" style={props.style}>
        <div className="container">


            <div className="my-5 newstitle text-center">
                <h1><span className="headline">DailyTimes</span> <span className="resthead">- {query} Headlines</span></h1>
            </div>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner/>}


            >
                <div className="container">
                    <div className='row'>


                        {articles.map((e) => {
                            if (e) {
                                return (
                                    <div className="col-md-3 mb-5" key={e.url}>
                                        <NewsItem
                                            title={e.title ? e.title : ""}
                                            description={
                                                e.description ? e.description.slice(0, 150 - e.title.length) : ""
                                            }
                                            imageUrl={
                                                e.urlToImage
                                                    ? e.urlToImage
                                                    : "https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg"
                                            }
                                            newsUrl={e.url}
                                            cardStyle={cardStyle}
                                        />
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}


                    </div>
                </div>
            </InfiniteScroll>

        </div>
    </div>);
};
export default News;
