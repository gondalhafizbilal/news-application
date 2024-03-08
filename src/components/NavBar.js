import React, { useState } from "react";

const NavBar = () => {
  const [source, setSource] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();

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
            <div className="container-fluid nav-flex">
              <form className="form-inline my-2 my-lg-0 search-form">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown filters me-2">
                    <label for="source">Source</label>
                    <button
                      type="button"
                      id="source"
                      class="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Source
                    </button>
                    <ul class="dropdown-menu">
                      <li className="dropdown-item">Source 1</li>
                      <li className="dropdown-item">Source 2</li>
                      <li className="dropdown-item">Source 3</li>
                    </ul>
                  </li>
                  <li className="nav-item mx-2">
                    <label for="category">Category</label>
                    <input className="form-control mr-sm-2" id="category" />
                  </li>
                  <li className="nav-item  mx-2">
                    <label for="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control mr-sm-2"
                    />
                  </li>
                  <li className="nav-item mx-2">
                    <label for="author">Author</label>
                    <input className="form-control mr-sm-2" id="author" />
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
