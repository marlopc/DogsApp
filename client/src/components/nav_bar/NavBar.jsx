import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDefaultHome, getDogs, setLoading } from "../../actions";
import dogsAppLogo from "../../assets/dogs-app-color.png";
import dogsAppLogoResponsive from "../../assets/responsive-logo.png";

const NavBar = () => {
  const [goHomeHidden, setGoHomeHidden] = useState(true);

  const dispatch = useDispatch();

  const toggleGoHomeHidden = () => {
    setGoHomeHidden(!goHomeHidden);
  };

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
        onMouseOver={toggleGoHomeHidden}
        onMouseOut={toggleGoHomeHidden}
        className="link"
      >
        <div className="logo-to-home">
          <img src={dogsAppLogo} alt="dogs-app-logo" className="logo" />
          <small className={goHomeHidden ? "go-home-hidden" : "go-home"}>
            To home {">"}
          </small>
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
        <div className="vertical-div-nav"></div>
        <Link to="/about" className="about link">
          About
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
