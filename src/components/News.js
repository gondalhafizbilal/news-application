import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    /* eslint-disable-next-line */
    const update = async () => {
      props.setProgress(30);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      props.setProgress(40);
      setLoading(true);
      let data = await fetch(url);
      console.log(data);
      props.setProgress(60);
      let parsedData = await data.json();
      console.log(parsedData);
      props.setProgress(80);

      setArticles(parsedData.articles);
      setTotalArticles(parsedData.totalResults);
      setLoading(false);

      props.setProgress(100);
    };
    props.setProgress(10);
    let title =
      props.category === "general"
        ? "News Monkey - Get your daily dose of news for free!"
        : `${props.category.toUpperCase()} - News Monkey`;
    document.title = title;
    props.setProgress(20);
    update();

    return () => {
      // this now gets called when the component unmounts
    };
    //disable dependency error for useEffect

    /* eslint-disable-next-line */
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    console.log(data);
    let parsedData = await data.json();
    console.log(parsedData);

    setArticles(articles.concat(parsedData.articles));
  };

  // const handleNextClick = async () => {
  //   console.log("Next");

  //   await setPage(page + 1 );
  //   console.log(this.state.page);
  //   useEfect();
  // };
  // const handlePrevClick = async () => {
  //   console.log("Previous");

  //   await setPage(page - 1 );
  //   console.log(this.state.page);
  //   useEffect();
  // };

  return (
    <div className="container my-3">
      {console.log("hello")}

      <h1 style={{ marginTop: "75px" }} className="text-center">
        NewsMonkey - Top Headlines
      </h1>

      <h2 className="text-center">{props.category.toUpperCase()}</h2>

      <hr />
      {loading && <Spinner />}

      {/* {!this.state.loading &&
            this.state.articles.map((article) => { */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-4">
            {
              //infinite scrolling
              articles.map((article) => {
                return (
                  <div className="col-md-4" key={article.url}>
                    <NewsItem
                      title={article.title}
                      description={article.description}
                      imageUrl={article.urlToImage}
                      newsUrl={article.url}
                      author={article.author}
                      date={new Date(article.publishedAt).toGMTString()}
                      source={article.source.name}
                    />
                  </div>
                );
              })
            }
          </div>
        </div>
      </InfiniteScroll>

      {/* next and previous click buttons */}
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div> */}
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
