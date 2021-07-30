import React, { useEffect } from "react";
import "./Error404.css";
import { Link } from "react-router-dom";

const Error404 = () => {

  useEffect(() => {
    document.title = "Error - Dogs App";
  }, []);

  return (
    <div className="error-container">
      <h1 className="error-description">Error 404: not found</h1>
      <Link className="link" id="return-home" to="/home">Home</Link>
    </div>
  )
};

export default Error404;
