import "./Loader.css";
import LoaderLogo from "../../assets/responsive-logo.png";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={LoaderLogo} alt="loader" className="loader" />
    </div>
  );
};

export default Loader;
