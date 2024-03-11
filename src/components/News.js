import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import NewsApi from "../utils/newsApi";
import GuardianApi from "../utils/guardianApi";
import NewYorkTimesApi from "../utils/nytApi";

const News = ({
  source,
  category,
  date,
  author,
  keyword,
  apiKey,
  setProgress,
  pageSize,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    setPage(1);
    setNotFound(false);
    setLoading(true);
    setProgress(10);

    const update = async () => {
      setProgress(30);
      let data;
      if (source === "The Guardian") {
        data = await GuardianApi.getData(apiKey, 1, category, keyword, date);
      } else if (source === "New York Times") {
        data = await NewYorkTimesApi.getData(
          apiKey,
          pageSize,
          1,
          category,
          keyword,
          date,
          author
        );
      } else {
        data = await NewsApi.getData(
          apiKey,
          pageSize,
          1,
          category,
          keyword,
          date,
          author
        );
      }
      if (data.articles?.length > 0) {
        setProgress(70);
        setArticles(data.articles);
        setProgress(80);
        setTotalArticles(data.totalArticles);
      } else {
        setNotFound(true);
      }
      setProgress(90);
      setLoading(false);
      setProgress(100);
    };

    setProgress(20);
    update();
  }, [source, category, date, author, keyword, pageSize, apiKey, setProgress]);

  const fetchMoreData = async () => {
    let data;
    if (source === "The Guardian") {
      data = await GuardianApi.getData(
        apiKey,
        page + 1,
        category,
        keyword,
        date
      );
    } else if (source === "New York Times") {
      data = await NewYorkTimesApi.getData(
        apiKey,
        pageSize,
        page + 1,
        category,
        keyword,
        date,
        author
      );
    } else {
      data = await NewsApi.getData(
        apiKey,
        pageSize,
        page + 1,
        category,
        keyword,
        date,
        author
      );
    }
    setPage(page + 1);
    setArticles(articles.concat(data.articles));
  };

  useEffect(() => {}, [articles]);
  return (
    <div className="container my-3">
      <h1 className="text-center main">{source} - Top Headlines</h1>
      <h2 className="text-center">{category?.toUpperCase()}</h2>
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
