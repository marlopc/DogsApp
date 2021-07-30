import React, { useEffect } from "react";
import "./About.css";
import NavBar from "../nav_bar/NavBar";
import Footer from "../footer/Footer";
import gitHubIcon from "../../assets/github_icon.png";
import linkedInIcon from "../../assets/linkedIn_icon.png";

const About = () => {

  useEffect(() => {
    document.title = "About - Dogs App";
  }, []);

  return (
    <div>
      <NavBar />
      <div className="about-page">
        <h1>ABOUT ME</h1>
        <div className="about-container">
          <p>
            Hi! I'm Lucas, a web developer student, this is a project that I
            made for Henry's bootcamp, it can search dogs, filter and sort them,
            also can create your own dog!
          </p>
          <p>hope you like it!</p>
          <div className="tecnologies-wrapper">
            <h2>TECHNOLOGIES USED:</h2>
            <ul className="tech-ul">
              <li>React-Redux</li>
              <li>Node.JS</li>
              <li>Express</li>
              <li>Sequelize</li>
              <li>PostgreSQL</li>
            </ul>
          </div>
          <p>
            you can use the following links if you want to contact me or see
            more:
          </p>
          <div className="socials-wrapper">
            <div className="social-item">
              <a
                href="https://www.linkedin.com/in/lucas-panaro/"
                target="_black"
                rel="noreferrer"
              >
                <img src={linkedInIcon} alt="linkedIn-icon" width="100px" />
              </a>
              <a
                href="https://www.linkedin.com/in/lucas-panaro/"
                target="_black"
                rel="noreferrer"
                className="link text-link"
              >
                <small className="text-link">/in/lucas-panaro/</small>
              </a>
            </div>
            <div className="social-item">
              <a
                href="https://github.com/marlopc"
                target="_blank"
                rel="noreferrer"
              >
                <img src={gitHubIcon} alt="github-icon" width="100px" />
              </a>
              <a
                href="https://www.linkedin.com/in/lucas-panaro/"
                target="_black"
                rel="noreferrer"
                className="link text-link"
              >
                <small className="text-link">/marlopc</small>
              </a>
            </div>
          </div>
          <h3>Thanks, see you!</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
