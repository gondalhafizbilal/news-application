import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
const App = () => {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <NavBar />
      <LoadingBar
        height={3}
        color="#f11946"
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />

      <News
        setProgress={setProgress}
        key="general"
        apiKey={apiKey}
        country="in"
        pageSize={pageSize}
        category="general"
      />
    </div>
  );
};
export default App;
