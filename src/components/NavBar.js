import React, { useState } from "react";

const NavBar = (props) => {
  const sources = ["NewsAPI", "The Guardian", "New York Times"];
  const [source, setSource] = useState(props.source);
  const [date, setDate] = useState(props.date);
  const [category, setCategory] = useState(props.category);
  const [author, setAuthor] = useState(props.author);
  const [keyword, setKeyword] = useState(props.keyword);

  const handleSearch = async (e) => {
    e.preventDefault();
    props.setSource(source);
    props.setDate(date);
    props.setCategory(category);
    props.setAuthor(author);
    props.setKeyword(keyword);
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid text-white">
          <h3>HafizNewsApp</h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="container nav-flex">
              <form
                className="form-inline my-2 my-lg-0 search-form"
                onSubmit={handleSearch}
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown filters mx-2">
                    <label htmlFor="source">Source</label>
                    <button
                      type="button"
                      id="source"
                      className="btn btn-primary dropdown-toggle btn-sm"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {source}
                    </button>
                    <ul className="dropdown-menu">
                      {sources.map((s) => {
                        if (s !== source) {
                          return (
                            <li
                              key={s}
                              className="dropdown-item"
                              onClick={() => {
                                setSource(s);
                              }}
                            >
                              {s}
                            </li>
                          );
                        } else {
                          return false;
                        }
                      })}
                    </ul>
                  </li>
                  <li className="nav-item mx-2">
                    <label htmlFor="category">Category</label>
                    <input
                      type="search"
                      className="form-control mr-sm-2 p-1"
                      placeholder="Enter"
                      id="category"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                  </li>
                  <li className="nav-item  mx-2">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      placeholder="Enter"
                      className="form-control mr-sm-2 p-1"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </li>
                  <li
                    className="nav-item mx-2"
                    hidden={source === "The Guardian"}
                  >
                    <label htmlFor="author">Author</label>
                    <input
                      type="search"
                      className="form-control mr-sm-2 p-1"
                      placeholder="Enter"
                      id="author"
                      value={author}
                      onChange={(e) => {
                        setAuthor(e.target.value);
                      }}
                    />
                  </li>
                  <li className="nav-item mx-2">
                    <label htmlFor="keyword">Keyword</label>
                    <input
                      type="search"
                      className="form-control mr-sm-2 p-1"
                      placeholder="Enter"
                      id="keyword"
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                      }}
                    />
                  </li>
                  <li className="nav-item mt-4">
                    <button
                      className="btn btn-outline-success my-2 my-sm-0 mx-2"
                      type="submit"
                    >
                      Search
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
