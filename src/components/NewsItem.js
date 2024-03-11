import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className="card shadow-hover">
      <img
        src={
          imageUrl
            ? imageUrl
            : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
        }
        className="card-img-top"
        alt="..."
        height={300}
      />
      <div className="card-body">
        <h5 className="card-title">
          {title}
          <span className="badge text-bg-danger mx-2">{source}</span>
        </h5>
        <p className="card-text">{description ? description : "..."}</p>
        <p className="card-text">
          <small className="text-success">
            By <b>{author ? author : "Unknown"} </b>on <b>{date}</b>
          </small>
        </p>
        <a
          rel="noreferrer"
          href={newsUrl}
          target="_blank"
          className="btn btn-sm btn-primary fw-bold p-2"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
