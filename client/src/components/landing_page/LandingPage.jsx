import React from "react";
import "./LandingPage.css";
import landingFront from "../../assets/front-view.png";
import landingFrontResponsive from "../../assets/front-view-responsive.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="background-image">
      <div className="container-card">
        <img src={landingFront} alt="laptop_dog" className="dog"></img>
        <img
          src={landingFrontResponsive}
          alt="laptop_dog"
          className="dog dog-responsive"
        ></img>
        <div className="vertical-line"></div>
        <div className="link-div">
          <Link to="/home/page=1" className="link">
            <div className="enter-btn">
              <h2>ENTER {">"}</h2>
            </div>
          </Link>
        </div>
      </div>
      <footer>
        <div className="footer">
          <a
            href="https://www.freepik.com/vectors/logo"
            target="_blank"
            rel="noreferrer"
          >
            Logo vector created by catalyststuff - www.freepik.com
          </a>
          <small>| Page created by Lucas Panaro</small>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
