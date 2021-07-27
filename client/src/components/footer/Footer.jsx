import "./Footer.css";
import { NavLink } from "react-router-dom";
import dogsAppLogo from "../../assets/dogs-app-color.png";

const Footer = () => {

  const handleLink = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className="footer-container">
      <div className="img-n-nav-container">
        <img src={dogsAppLogo} alt="" className="logo-footer" />
        <div className="vertical-div-footer" />
        <div className="navigation-footer">
          <h5>Navigation</h5>
          <ul className="ul-nav">
            <li>
              <NavLink to="/" className="link" onClick={handleLink}>
                Landing page
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="link" onClick={handleLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-dog" className="link" onClick={handleLink}>
                Create a dog
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="link" onClick={handleLink}>
                More about the app
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
