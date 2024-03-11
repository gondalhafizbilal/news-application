const getData = async (
  apiKey,
  pageSize,
  page,
  category,
  keyword,
  date,
  author
) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us${
    category ? `&category=${category?.toLowerCase()}` : ""
  }&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}${
    keyword ? `&q=${keyword?.toLowerCase()}` : ""
  }`;
  const data = await fetch(url);
  const parsedData = await data.json();
  let filteredData = false,
    dataMore = [];
  const loop_length = Math.ceil(parsedData.totalResults / pageSize);
  if (author || date) {
    if (author && date) {
      dataMore = parsedData.articles.filter((article) => {
        return (
          article.author === author &&
          article.publishedAt.split("T")[0] === date
        );
      });
    } else if (author) {
      dataMore = parsedData.articles.filter((article) => {
        return article.author === author;
      });
    } else if (date) {
      dataMore = parsedData.articles.filter((article) => {
        return article.publishedAt.split("T")[0] === date;
      });
    }
    if (!filteredData) {
      while (page < loop_length) {
        page++;

        dataMore = [
          ...dataMore,
          ...(await getMoreData(
            apiKey,
            pageSize,
            page,
            category,
            keyword,
            author,
            date
          )),
        ];
      }
      filteredData = true;
    }
  }
  if (filteredData) {
    return {
      articles: dataMore,
      totalArticles: dataMore.length,
    };
  }
  return {
    articles: parsedData.articles,
    totalArticles: parsedData.totalResults,
  };
};
const getMoreData = async (
  apiKey,
  pageSize,
  page,
  category,
  keyword,
  author,
  date
) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us${
    category ? `&category=${category?.toLowerCase()}` : ""
  }&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}${
    keyword ? `&q=${keyword?.toLowerCase()}` : ""
  }`;
  let data = await fetch(url);
  let parsedData = await data.json();
  let filteredData = false;
  if (author || date) {
    if (author && date) {
      filteredData = parsedData.articles.filter((article) => {
        return (
          article.author === author &&
          article.publishedAt.split("T")[0] === date
        );
      });
    } else if (author) {
      filteredData = parsedData.articles.filter((article) => {
        return article.author === author;
      });
    } else if (date) {
      filteredData = parsedData.articles.filter((article) => {
        return article.publishedAt.split("T")[0] === date;
      });
    }
    return filteredData;
  }
};
module.exports = { getData };
