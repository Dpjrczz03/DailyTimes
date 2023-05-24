import React, {useEffect, useState} from 'react';
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";


const News = (props) => {

    const cardcolor1=props.cardcolor
    const api = '18e2fc5154914e4b8b98abac11b11663'
    const article = []
    const [articles, setArticles] = useState(article)
    const [totalResults, setTotalResults] = useState(0)
    const [page, setPage] = useState(1)

    let query = props.query;

    useEffect(() => {

        let url;
        if (query === '') {

            url = "https://newsapi.org/v2/everything?q=Mario&from=2023-05-01&to=2023-05-20&sortBy=popularity&apiKey=" + api + "&pageSize=10&page=" + page;
        } else {
            url = "https://newsapi.org/v2/everything?q=" + query + "&from=2023-05-01&to=2023-05-20&sortBy=popularity&apiKey=" + api + "&pageSize=10&page=" + page;
        }
        props.setProgress(10)
        let data = fetch(url)
            .then(data => data.json())
            .then(data => {
                props.setProgress(30)

                setArticles(data.articles);

                setTotalResults(data.totalResults);
            });

    }, [query])

     props.setProgress(100)

const fetchMoreData = async () => {
  const nextPage = page + 1;
  let url;
  if (query === '') {
    url =
      "https://newsapi.org/v2/everything?q=Mario&from=2023-05-01&to=2023-05-20&sortBy=popularity&apiKey=" +
      api +
      "&pageSize=10&page=" +
      nextPage;
  } else {
    url =
      "https://newsapi.org/v2/everything?q=" +
      query +
      "&from=2023-05-01&to=2023-05-20&sortBy=popularity&apiKey=" +
      api +
      "&pageSize=10&page=" +
      nextPage;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    setArticles((prevArticles) => prevArticles.concat(data.articles));
    setTotalResults(data.totalResults);
    setPage(nextPage);
    console.log(articles.length);
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
                                            cardcolor1={cardcolor1}
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
