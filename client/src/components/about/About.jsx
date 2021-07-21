import NavBar from "../nav_bar/NavBar";
import Footer from "../footer/Footer";
import "./About.css";

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="about-container">
        <h1>ABOUT ME</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, fuga!
          Voluptatem, culpa sint labore ad laborum, rem, cumque consequatur et
          eos similique iusto voluptate quis distinctio quod! Doloribus, eos?
          Sit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
          temporibus sint illo ipsam nostrum dolorum officia cumque, est vel
          impedit consectetur, quam magnam facilis quo consequuntur. Vel sit
          dicta ad?
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
