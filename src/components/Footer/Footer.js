// CSS
import "./Footer.css";

// images
import smallLogo from "../../assets/images/small-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={smallLogo} alt="logo Marvel" className="logo" />
        <p>
          Marvel Universe - Development React, express & node Js by
          <a href="https://github.com/bmariem" target="_blank" rel="noreferrer">
            Mariem Belgacem
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
