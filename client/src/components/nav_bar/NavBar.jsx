import React from "react";
import "./NavBar.css";
import dogsAppLogo from "../../assets/dogs-app-color.png";
import dogsAppLogoResponsive from "../../assets/responsive-logo.png";
import { useDispatch } from "react-redux";
import { setDefaultHome, getDogs, setLoading } from "../../actions";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleGoHome = () => {
    dispatch(setLoading(true));
    dispatch(setDefaultHome());
    dispatch(getDogs());
  };

  return (
    <nav className="nav-container">
      <Link
        to="/home"
        onClick={handleGoHome}
        className="link"
      >
        <div className="logo-to-home">
          <img src={dogsAppLogo} alt="dogs-app-logo" className="logo" />
        </div>
      </Link>
      <div className="links-container">
        <Link to="/home" onClick={handleGoHome}>
          <img
            src={dogsAppLogoResponsive}
            alt="dogs-app-rlogo"
            className="small-logo"
          />
        </Link>
        <Link to="/create-dog" className="create-dog link">
          Create
        </Link>
        <Link to="/about" className="about link">
          About
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
