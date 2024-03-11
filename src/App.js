import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
const App = () => {
  const pageSize = 10;
  const [progress, setProgress] = useState(0);

  const [source, setSource] = useState("NewsAPI");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <NavBar
        source={source}
        date={date}
        category={category}
        author={author}
        keyword={keyword}
        setSource={setSource}
        setDate={setDate}
        setCategory={setCategory}
        setAuthor={setAuthor}
        setKeyword={setKeyword}
      />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <News
        setProgress={setProgress}
        apiKey={
          source === "New York Times"
            ? process.env.REACT_APP_NEW_YORK_TIMES_API
            : source === "The Guardian"
            ? process.env.REACT_APP_GUARDIAN_API
            : process.env.REACT_APP_NEWS_API
        }
        pageSize={pageSize}
        author={author ? author : ""}
        category={category ? category : ""}
        date={date ? date : ""}
        keyword={keyword}
        source={source}
      />
    </div>
  );
};
export default App;
