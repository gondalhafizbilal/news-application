const getData = async (apiKey, page, category, keyword, date) => {
  category = category?.toLowerCase();
  const url = `https://content.guardianapis.com/search?page=${page}${
    keyword ? `&q=${keyword}` : ""
  }${category ? `&tag=${category}/${category}` : ""}${
    date ? `&from-date=${date}` : ""
  }&api-key=${apiKey}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  return {
    articles: parsedData.response.results,
    totalArticles: parsedData.response.total,
  };
};

module.exports = { getData };
