import React from "react";
import { useNavigate } from "react-router-dom";

const Header = (props: any) => {
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
  };
  return (
    <div className="header_main">
      <div className="header_left">
        <img
          src="https://surveyagency.netlify.app/images/logo.png"
          className="header_left_image"
          alt=""
        />
        <span>SurveyAgency</span>
      </div>
      <div className="header_right">
        <div className="header_right_btn" onClick={logOut}>
          <span>Log Out</span>
          <img
            src="https://surveyagency.netlify.app/images/right-arrow.png"
            className="header_right_image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
