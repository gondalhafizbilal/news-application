const getData = async (apiKey, pageSize, page, category, keyword, date) => {
  const d = date.split("-");
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${
    keyword ? `q=${keyword}&` : ""
  }${category ? `fq=news_desk:(${category})&` : ""}${
    date ? `begin_date=${d[0] + d[1] + d[2]}&` : ""
  }api-key=${apiKey}`;
  let data = await fetch(url);
  console.log(data);
  let parsedData = await data.json();
  console.log(parsedData);

  return {
    articles: parsedData.response?.docs,
    totalArticles: parsedData.totalResults,
  };
};
// const getMoreData = async (apiKey, pageSize, category, page) => {
//   const url = `https://newsapi.org/v2/top-headlines?country=in${
//     category && `&category=${category.toLowerCase()}`
//   }&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
//   //   setPage(page + 1);
//   let data = await fetch(url);
//   console.log(data);
//   let parsedData = await data.json();
//   return { articles: parsedData.articles };
// };
module.exports = { getData };
