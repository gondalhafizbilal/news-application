import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import NewsApi from "../utils/newsApi";
import GuardianApi from "../utils/guardianApi";
import NewYorkTimesApi from "../utils/nytApi";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    setPage(1);
    setNotFound(false);
    setLoading(true);
    props.setProgress(10);

    const update = async () => {
      props.setProgress(30);
      let data;
      if (props.source === "The Guardian") {
        data = await GuardianApi.getData(
          props.apiKey,
          1,
          props.category,
          props.keyword,
          props.date
        );
      } else if (props.source === "New York Times") {
        data = await NewYorkTimesApi.getData(
          props.apiKey,
          props.pageSize,
          1,
          props.category,
          props.keyword,
          props.date,
          props.author
        );
      } else {
        data = await NewsApi.getData(
          props.apiKey,
          props.pageSize,
          1,
          props.category,
          props.keyword,
          props.date,
          props.author
        );
      }
      if (data.articles?.length > 0) {
        props.setProgress(70);
        setArticles(data.articles);
        props.setProgress(80);
        setTotalArticles(data.totalArticles);
      } else {
        setNotFound(true);
      }
      props.setProgress(90);
      setLoading(false);
      props.setProgress(100);
    };

    props.setProgress(20);
    update();
  }, [props.source, props.category, props.date, props.author, props.keyword]);

  const fetchMoreData = async () => {
    let data;
    if (props.source === "The Guardian") {
      data = await GuardianApi.getData(
        props.apiKey,
        page + 1,
        props.category,
        props.keyword,
        props.date
      );
    } else if (props.source === "New York Times") {
      data = await NewYorkTimesApi.getData(
        props.apiKey,
        props.pageSize,
        page + 1,
        props.category,
        props.keyword,
        props.date,
        props.author
      );
    } else {
      data = await NewsApi.getData(
        props.apiKey,
        props.pageSize,
        page + 1,
        props.category,
        props.keyword,
        props.date,
        props.author
      );
    }
    setPage(page + 1);
    setArticles(articles.concat(data.articles));
  };

  useEffect(() => {}, [articles]);
  return (
    <div className="container my-3">
      <h1 className="text-center main">{props.source} - Top Headlines</h1>
      <h2 className="text-center">{props?.category?.toUpperCase()}</h2>
      <hr />
      {loading && <Spinner />}
      {notFound ? (
        <div className="text-center text-danger my-5 py-5">
          <h3>"There isn't any data matching these filters."</h3>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={articles?.length}
          next={fetchMoreData}
          hasMore={articles?.length < totalArticles}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-4">
              {articles?.map((article, index) => {
                return (
                  <div className="col-md-4 mb-3" key={index}>
                    <NewsItem
                      title={
                        article?.title
                          ? article.title
                          : article.webTitle
                          ? article.webTitle
                          : article.abstract
                      }
                      description={
                        article?.description
                          ? article.description
                          : article.lead_paragraph
                      }
                      imageUrl={
                        article?.urlToImage
                          ? article?.urlToImage
                          : article?.multimedia?.length
                          ? `https://static01.nyt.com/${article?.multimedia[0]?.url}`
                          : ""
                      }
                      newsUrl={
                        article?.url
                          ? article.url
                          : article.webUrl
                          ? article.webUrl
                          : article.web_url
                      }
                      author={
                        article?.author
                          ? article?.author
                          : article?.byline?.original?.substring(3)
                      }
                      date={new Date(
                        article?.publishedAt
                          ? article?.publishedAt
                          : article?.webPublicationDate
                          ? article?.webPublicationDate
                          : article?.pub_date
                      ).toGMTString()}
                      source={
                        article?.source?.name
                          ? article?.source?.name
                          : article?.sectionName
                          ? article?.sectionName
                          : article.source
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};
export default News;
