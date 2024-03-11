const getData = async (apiKey, pageSize, page, category, keyword, author) => {
  const url = `https://newsapi.org/v2/top-headlines?country=in${
    category ? `&category=${category?.toLowerCase()}` : ""
  }&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}${
    keyword ? `&q=${keyword?.toLowerCase()}` : ""
  }`;
  const data = await fetch(url);
  console.log(data);
  const parsedData = await data.json();
  // let filteredData = false;
  // const loop_length = parsedData.totalResults/pageSize;
  // if (author) {

  //  filteredData = parsedData.articles.filter((article) => {
  //    article.author === author;

  //  });
  //   if (!filteredData.length) {
  //     const data_more = getMoreData(
  //       apiKey,
  //       pageSize,
  //       page + 1,
  //       category,
  //       keyword,
  //       author
  //     );
  //     while (data_more.length !== 0) {

  //     }
  //   }
  // }
  console.log(parsedData);
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
  author
) => {
  const url = `https://newsapi.org/v2/top-headlines?country=in${
    category && `&category=${category.toLowerCase()}`
  }&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
  //   setPage(page + 1);
  let data = await fetch(url);
  console.log(data);
  let parsedData = await data.json();
  return { articles: parsedData.articles };
};
module.exports = { getData };
