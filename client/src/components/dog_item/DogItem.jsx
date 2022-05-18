import React from "react";
import "./DogItem.css";
import { Link } from "react-router-dom";

const DogItem = ({ name, image_url, temperament, id }) => {
  let attempt = 0;
  const addDefaultSrc = (e) => {
    attempt++;
    if (attempt < 2) {
      e.target.src = image_url && `${image_url.slice(0, -4)}.png`;
    }
  };

  return (
    <Link to={`/detail/${id}`} className="item-container link">
      <img src={`${image_url}`} onError={addDefaultSrc} alt={`${name}`} />
      <div className="dog-info">
        <h2>{name}</h2>
        <p>{temperament}</p>
      </div>
    </Link>
  );
};

export default DogItem;
