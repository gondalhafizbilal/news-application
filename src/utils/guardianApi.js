const getData = async (apiKey, page, category, keyword, date) => {
  category = category?.toLowerCase();
  const url = `https://content.guardianapis.com/search?page=${page}${
    keyword ? `&q=${keyword}` : ""
  }${category ? `&tag=${category}/${category}` : ""}${
    date ? `&from-date=${date}` : ""
  }&api-key=${apiKey}`;
  let data = await fetch(url);
  console.log(data);
  let parsedData = await data.json();
  console.log(parsedData);
  return {
    articles: parsedData.response.results,
    totalArticles: parsedData.response.total,
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
