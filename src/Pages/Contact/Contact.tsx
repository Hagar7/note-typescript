import React from "react";
import style from "./Contact.module.scss";

const Contact = () => {
  return (
    <>
      <div className={`${style.contact}`}>
        <div className="container">
          <h2>Contact</h2>
          <div className="col-md-12">
            <div className={`${style.contactInfo}`}>
              <h5>Follow Me</h5>
              <ul>
                <li>
                  <a href="https://www.linkedin.com/in/hagar-ahmed-83119a54">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Hagar7">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="mailto:hagar_s_ahmed@hotmail.com">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.copy}`}>
        <h4>Hagar Ahmed</h4>
      </div>
    </>
  );
};

export default Contact;
