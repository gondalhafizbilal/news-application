const getData = async (
  apiKey,
  pageSize,
  page,
  category,
  keyword,
  date,
  author
) => {
  const d = date.split("-");
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?${
    keyword ? `q=${keyword}&` : ""
  }${category ? `fq=news_desk:(${category})&` : ""}${
    date ? `begin_date=${d[0] + d[1] + d[2]}&` : ""
  }api-key=${apiKey}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  let filteredData = false;
  if (author) {
    filteredData = parsedData.response?.docs.filter((article) =>
      article.byline.original?.toLowerCase().includes(author.toLowerCase())
    );
  }

  return {
    articles: filteredData ? filteredData : parsedData.response?.docs,
    totalArticles: filteredData ? filteredData.length : parsedData.totalResults,
  };
};

module.exports = { getData };
