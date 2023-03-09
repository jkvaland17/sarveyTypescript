import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Home = (props: any) => {
  const navigate = useNavigate();

  const goWorkplace = () => {
    navigate("/workplace");
  };

  return (
    <div>
      <Header />
      <div className="home_wrapper">
        <div className="home_wrapper_left">
          <div className="home__wrapper__left__title">
            There's a better way to ask
          </div>
          <div className="home__wrapper__left__desc">
            You don't want to make a boring form. And your audience won't answer
            one. Create a typeform instead—and make everyone happy.
          </div>
          <div className="home__wrapper__left__btn" onClick={goWorkplace}>
            <span>Let's get started</span>
          </div>
        </div>
        <div className="home__wrapper__right">
          <img src="https://surveyagency.netlify.app/images/bg.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
