import './NavBar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {

  const [goHomeHidden, setGoHomeHidden] = useState(true);

  const toggleGoHomeHidden = () => {
    setGoHomeHidden(!goHomeHidden);
  }

  return (
    <nav className="nav-container">
      <Link to="/home/page=1" onMouseOver={toggleGoHomeHidden} onMouseOut={toggleGoHomeHidden} className="link">
        <div className="logo-to-home">
          <img src="../../img/dogs-app-color.png" alt="dogs-app-logo" className="logo"/>
          <small className={goHomeHidden ? "go-home-hidden" : "go-home"}>To home {">"}</small>
        </div>
      </Link>
      <div className="links-container">
        <Link to="/home/page=1">
          <img src="../../img/responsive-logo.png" alt="dogs-app-rlogo" className="small-logo"/>
        </Link>
        <Link to="/home/create-dog" className="create-dog link">
          Create
        </Link>
        <div className="vertical-div-nav"></div>
        <Link to="/home/about" className="about link">
          About
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
