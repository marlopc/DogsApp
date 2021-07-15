import './Footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="img-n-nav-container">
        <img src="../../img/dogs-app-color.png" alt="" className="logo-footer"/>
        <div className="vertical-div-footer" />
        <div className="navigation-footer">
          <h5>Navigation</h5>
          <ul className="ul-nav">
            <li><NavLink to="/" className="link">Landing page</NavLink></li>
            <li><NavLink to="/home" className="link">Home</NavLink></li>
            <li><NavLink to="/create-dog" className="link">Create a dog</NavLink></li>
            <li><NavLink to="/about" className="link">More about the app</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
