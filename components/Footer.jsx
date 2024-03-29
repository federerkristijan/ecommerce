import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";


const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Ecommerce practice Web App</p>
      <p>YouTube Tutorial by: JavaScript Mastery</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
